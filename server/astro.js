import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { build } from "astro";

const DEVELOPMENT = (process.env.NODE_ENV !== "production");
const __dirname = dirname(fileURLToPath(import.meta.url));

const server = express();
export default server;
const astroHandlers = startAstro();

// serve Astro's static assets
server.use(async function (req, res, next) {
  const { staticHandler } = await astroHandlers;
  staticHandler(req, res, next);
});

// serve Astro's SSR pages and endpoints
server.use(async function (req, res, next) {
  const { ssrHandler } = await astroHandlers;
  const { locals } = res;
  ssrHandler(req, res, next, locals);
});

async function startAstro() {
  if (DEVELOPMENT) {
    await build({
      root: resolve(__dirname, "../"),
    });
  }
  
  const staticPath = resolve(__dirname, "../dist/client/");
  return {
    staticHandler: express.static(staticPath),
    ssrHandler: (await import("~/dist/server/entry.mjs")).handler,
  };
}
