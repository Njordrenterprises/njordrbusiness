import { Handlers } from "$fresh/server.ts";

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

    const adminEmailContent = `
      <h1>New Quote Request</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Services:</strong> ${services.join(", ")}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    const userEmailContent = `
      <h1>Thank you for your quote request!</h1>
      <p>We have received your request and will get back to you shortly. Here's a summary of your submission:</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Services:</strong> ${services.join(", ")}</p>
      <p><strong>Message:</strong> ${message}</p>
      <p>To schedule an appointment, please click the button below:</p>
      <a href="https://calendly.com/njordr" style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Schedule Appointment</a>
    `;

    try {
      await sendEmail("hello@njordr.ca", "New Quote Request", adminEmailContent);
      await sendEmail(email, "Quote Request Confirmation - Njörðr Exteriors", userEmailContent);
      return new Response("Message sent successfully", { status: 200 });
    } catch (error) {
      console.error("Error sending email:", error);
      return new Response("Failed to send message", { status: 500 });
    }
  },
};
