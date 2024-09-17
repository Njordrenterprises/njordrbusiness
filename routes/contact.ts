import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req) {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
    if (!SENDGRID_API_KEY) {
      return new Response("SendGrid API key not found", { status: 500 });
    }

    try {
      const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${SENDGRID_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: "hello@njordr.ca" }],
              subject: "New Contact Form Submission",
            },
          ],
          from: { email: "hello@njordr.ca" },
          content: [
            {
              type: "text/plain",
              value: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            },
          ],
        }),
      });

      if (response.ok) {
        return new Response("Message sent successfully", { status: 200 });
      } else {
        const errorText = await response.text();
        console.error("SendGrid API error:", errorText);
        return new Response("Failed to send message", { status: 500 });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      return new Response("Internal server error", { status: 500 });
    }
  },
};
