import http from "http";
import app from "./index.js";
import serverConfig from "./config/server.config.js";
import { connectDB } from "./config/db.config.js";

const server = http.createServer(app);

const db = await connectDB();
app.set("db", db);

server.listen(serverConfig.port, async () => {
  try {
    console.log(
      `Server running at http://${serverConfig.host}:${serverConfig.port}`
    );
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
});
