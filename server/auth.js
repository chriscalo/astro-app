import express from "express";
import clientSessions from "client-sessions";
import duration from "parse-duration";

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
    signin(username) {
      session.username = username;
    },
    signout() {
      session.destroy();
    },
    isSignedIn() {
      return session.username != null;
    },
    createSignInURL(returnTo) {
      const signInPath = "/";
      const url = new URL(returnTo, "http://localhost");
      const encodedReturnTo = encodeURIComponent(
        url.pathname + url.search + url.hash
      );
      return `${signInPath}?returnTo=${encodedReturnTo}`;
    },
  });
  
  next();
});
