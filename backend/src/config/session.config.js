import SQLiteStoreFactory from "connect-sqlite3";
import session from "express-session";
import serverConfig from "./server.config.js";

const SQLiteStore = SQLiteStoreFactory(session);

export function sessionConfig() {
  return session({
    secret: serverConfig.session_secret,
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({
      db: "sessions.db",
      dir: "./src/db/",
    }),
    cookie: {
      secure: serverConfig.env === "production" ? true : false,
      sameSite: "lax",
      maxAge: serverConfig.expiresIn,
      httpOnly: true,
    },
  });
}
