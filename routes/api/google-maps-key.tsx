import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET: async (req) => {
    const apiKey = Deno.env.get("GOOGLE_MAPS_API_KEY");
    return new Response(JSON.stringify({ apiKey }), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
