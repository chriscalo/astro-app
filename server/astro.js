import express from "express";
import { handler as astroSsrHandler } from "~/dist/server/entry.mjs";

const server = express();
export default server;

server.use(express.static("dist/client/"));
server.use(function (req, res, next) {
  const { locals } = res;
  astroSsrHandler(req, res, next, locals);
});
