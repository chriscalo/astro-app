import express from "express";
import clientSessions from "client-sessions";
import duration from "parse-duration";
import assert from "node:assert";

const server = express();
export default server;

server.use(clientSessions({
  // cookie name dictates the key name added to the request object
  cookieName: "session",
  secret: "REPLACE THIS WITH A REAL SECRET",
  duration: duration("24h"),
  activeDuration: duration("1h"),
}));

server.use((req, _, next) => {
  const { session } = req;
  
  Object.assign(session, {
    signin,
    signout,
    isSignedIn,
    createSignInURL,
  });
  
  next();
  
  function signin(username) {
    assert(typeof username === "string", "username must be a string");
    assert(username.length > 0, "username is required");
    session.username = username;
  }
  
  function signout() {
    session.destroy();
  }
  
  function isSignedIn() {
    return session.username != null;
  }
  
  function createSignInURL(returnTo) {
    const signInPath = "/";
    // use throwaway `http://localhost` to handle relative URLs
    const url = new URL(returnTo, "http://localhost");
    const returnToEncoded = encodeURIComponent(
      url.pathname + url.search + url.hash
    );
    return `${signInPath}?returnTo=${returnToEncoded}`;
  }
});
