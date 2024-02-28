import express from "express";
import { rpcService }  from "rpc-light/server.js";
import authn, { signinRequired } from "./authn.js";
import astro from "./astro.js";

const server = express();

server.use(authn);

server.use([
  "/home",
  "/products",
], signinRequired);

server.use("/rpc", rpcService({
  greetingService: {
    greet(name, exclaim = false) {
      const punctuation = exclaim ? "!": "."
      const message = `Hello, ${name}` + punctuation;
      return {
        message,
      };
    },
  },
}));

server.use(astro);

server.listen(8080, function () {
  console.log("Server started on http://localhost:8080/");
});
