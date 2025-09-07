import express from "express";
import Router from "./routes/index.js";
import setup from "./setup.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./db.js";
import dotenv from "dotenv";
import session from "express-session";

dotenv.config();

await setup();

const app = express();

app.use(express.json());
app.use(cors({ origin: String(process.env.CLIENT_URL), credentials: true }));
app.use(cookieParser());

app.use(
  session({
    name: "sid",
    secret: String(process.env.SESSION_SECRET) || "secret@123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      sameSite: "lax",
      secure: String(process.env.NODE_ENV) === "production",
    },
  })
);

app.set("db", db);

app.use("/api/v1", Router);

app.listen(8000, () => {
  try {
    console.log("Server is running on port 8000");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
