import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { build } from "astro";

const server = express();
export default server;

const astroReady = new Promise(async function (resolve, reject) {
  const DEVELOPMENT = (process.env.NODE_ENV !== "production");
  
  if (DEVELOPMENT) {
    await build({
      root: resolveRelativePath("../"),
    });
    resolve(true);
  } else {
    resolve(true);
  }
});

server.use(async function (req, res, next) {
  await astroReady;
  next();
});

server.use(express.static("dist/client/"));

let astroSsrHandler = null;
server.use(async function (req, res, next) {
  if (!astroSsrHandler) {
    const { handler } = await import("~/dist/server/entry.mjs");
    astroSsrHandler = handler
  }
  const { locals } = res;
  astroSsrHandler(req, res, next, locals);
});

function resolveRelativePath(relativePath) {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  return resolve(__dirname, relativePath);
}
