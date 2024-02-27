import { sequence } from "astro:middleware";

async function inspect({ locals }, next) {
  console.log("Astro middleware:");
  console.log("locals:", locals);
  return next();
}

async function validation(_, next) {
  console.log("validation request");
  const response = await next();
  console.log("validation response");
  return response;
}

async function auth(_, next) {
  console.log("auth request");
  const response = await next();
  console.log("auth response");
  return response;
}

async function greeting(_, next) {
  console.log("greeting request");
  const response = await next();
  console.log("greeting response");
  return response;
}

export const onRequest = sequence(
  inspect,
  validation,
  auth,
  greeting
);
