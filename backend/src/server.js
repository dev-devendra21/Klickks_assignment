import http from "http";
import app from "./index.js";
import serverConfig from "./config/server.config.js";
import { connectDB } from "./config/db.config.js";

const server = http.createServer(app);

const db = await connectDB();
app.set("db", db);

server.listen(serverConfig.port, async () =>
  console.log(
    `Server running on http://${serverConfig.host}:${serverConfig.port}`
  )
);
