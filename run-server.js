import express from "express";
import auth from "./server/auth.js";
import { handler as ssrHandler } from "./dist/server/entry.mjs";

const app = express();
app.use(express.static("dist/client/"));
app.use(auth);
app.use((req, res, next) => {
  const locals = {
    setby: "Express server",
    session: req.session,
  };
  ssrHandler(req, res, next, locals);
});

app.listen(8080, function () {
  console.log("Server started on http://localhost:8080/");
});
