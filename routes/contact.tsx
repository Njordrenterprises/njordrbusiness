import { Handlers } from "$fresh/server.ts";
import { createClient } from "https://esm.sh/@libsql/client@0.x/web";
import { S3Client, PutObjectCommand } from "npm:@aws-sdk/client-s3";
import { v4 as uuidv4 } from "npm:uuid";

const TURSO_DATABASE_URL = Deno.env.get("TURSO_DATABASE_URL");
const TURSO_AUTH_TOKEN = Deno.env.get("TURSO_AUTH_TOKEN");

if (!TURSO_DATABASE_URL || !TURSO_AUTH_TOKEN) {
  console.error("Turso database configuration is missing. Please check your environment variables.");
}

const tursoClient = TURSO_DATABASE_URL && TURSO_AUTH_TOKEN
  ? createClient({
      url: TURSO_DATABASE_URL,
      authToken: TURSO_AUTH_TOKEN,
    })
  : null;

// Create table if not exists
await tursoClient!.execute(`
  CREATE TABLE IF NOT EXISTS quote_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
`);

const s3Client = new S3Client({
  region: "us-west-2",
});

async function uploadToS3(file: File): Promise<string> {
  const fileExtension = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExtension}`;
  const fileBuffer = await file.arrayBuffer();

  const command = new PutObjectCommand({
    Bucket: "njordr",
    Key: fileName,
    Body: new Uint8Array(fileBuffer),
    ContentType: file.type,
    ACL: "public-read",
  });

  await s3Client.send(command);
  return `https://njordr.s3.us-west-2.amazonaws.com/${fileName}`;
}

async function getEmailTemplate(templateName: string, data: Record<string, string>): Promise<string> {
  const template = await Deno.readTextFile(`./email_templates/${templateName}.html`);
  return template.replace(/{{(\w+)}}/g, (_, key) => data[key] || '');
}

async function sendEmail(to: string, subject: string, content: string) {
  const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
  if (!SENDGRID_API_KEY) {
    throw new Error("SendGrid API key not found");
  }

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }], subject }],
      from: { email: "hello@njordr.ca" },
      content: [{ type: "text/html", value: content }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`SendGrid API error: ${errorText}`);
  }
}

export const handler: Handlers = {
  async POST(req) {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const address = formData.get("address") as string;
    const phone = formData.get("phone") as string;
    const services = formData.getAll("services") as string[];
    const message = formData.get("message") as string;
    const budget = formData.get("budget") as string;
    const timeframe = formData.get("timeframe") as string;
    const completionDate = formData.get("completionDate") as string;
    const images = formData.getAll("images") as File[];

    const imageUrls = await Promise.all(images.map(uploadToS3));
    const imageHtml = imageUrls.map(url => `<img src="${url}" style="max-width: 300px; margin: 10px 0;">`).join("");

    // Store user data in Turso
    await tursoClient!.execute({
      sql: "INSERT INTO quote_requests (name, email, address, phone, services, message, image_urls, budget, timeframe, completion_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      args: [name, email, address, phone, services.join(","), message, imageUrls.join(","), budget, timeframe, completionDate],
    });

    const templateData = {
      name,
      email,
      address,
      phone,
      services: services.join(", "),
      message,
      imageHtml,
      budget,
      timeframe,
      completionDate,
    };

    try {
      const adminEmailContent = await getEmailTemplate('admin_template', templateData);
      const userEmailContent = await getEmailTemplate('user_template', templateData);

      await sendEmail("hello@njordr.ca", "New Quote Request", adminEmailContent);
      await sendEmail(email, "Quote Request Confirmation - Njörðr Exteriors", userEmailContent);
      return new Response("Message sent successfully", { status: 200 });
    } catch (error) {
      console.error("Error sending email:", error);
      return new Response("Failed to send message", { status: 500 });
    }
  }
};
