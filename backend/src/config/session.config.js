import SQLiteStoreFactory from "connect-sqlite3";
import session from "express-session";
import serverConfig from "./server.config.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SQLiteStore = SQLiteStoreFactory(session);

export function sessionConfig() {
  return session({
    secret: serverConfig.session_secret || "secretKey@123",
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({
      db: "sessions.db",
      dir: path.resolve(__dirname, "../db/sessions.db"),
    }),
    cookie: {
      secure: serverConfig.env === "production" ? true : false,
      sameSite: "lax",
      maxAge: serverConfig.expiresIn || 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
  });
}
