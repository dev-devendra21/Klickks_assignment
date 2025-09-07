import dotenv from "dotenv";

function loadConfig() {
  dotenv.config();
  console.log("Server Config loaded");
}

loadConfig();

const serverConfig = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || "localhost",
  env: process.env.NODE_ENV || "development",
  session_secret: process.env.SESSION_SECRET_KEY || "secretKey@123",
  expiresIn: process.env.EXPIRES_IN || 1000 * 60 * 60 * 24,
  client_url: process.env.CLIENT_URL || "http://localhost:5173",
};

export default serverConfig;
