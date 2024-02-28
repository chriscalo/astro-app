import express from "express";
import authn, { signinRequired } from "./authn.js";
import astro from "./astro.js";

const server = express();

server.use(authn);

server.use([
  "/home",
  "/products",
], signinRequired);

server.use(astro);

server.listen(8080, function () {
  console.log("Server started on http://localhost:8080/");
});
