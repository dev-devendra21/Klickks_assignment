import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { sessionConfig } from "./config/session.config.js";
import v1Router from "./routes/index.route.js";
import { string } from "zod";
import serverConfig from "./config/server.config.js";

const app = express();
app.use(
  cors({
    origin: string(serverConfig.client_url),
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(sessionConfig());

app.use("/api/v1", v1Router);

export default app;
