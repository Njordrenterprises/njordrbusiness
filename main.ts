/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "$std/dotenv/load.ts";

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import config from "./fresh.config.ts";

console.log("TURSO_DATABASE_URL:", Deno.env.get("TURSO_DATABASE_URL") ? "Set" : "Not set");
console.log("TURSO_AUTH_TOKEN:", Deno.env.get("TURSO_AUTH_TOKEN") ? "Set" : "Not set");
console.log("SENDGRID_API_KEY:", Deno.env.get("SENDGRID_API_KEY") ? "Set" : "Not set");
console.log("GOOGLE_MAPS_API_KEY:", Deno.env.get("GOOGLE_MAPS_API_KEY") ? "Set" : "Not set");
console.log("AWS_ACCESS_KEY_ID:", Deno.env.get("AWS_ACCESS_KEY_ID") ? "Set" : "Not set");
console.log("AWS_SECRET_ACCESS_KEY:", Deno.env.get("AWS_SECRET_ACCESS_KEY") ? "Set" : "Not set");

await start(manifest, config);
