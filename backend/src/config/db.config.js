import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function connectDB() {
  try {
    const dbPath = path.resolve(__dirname, "../db/users.db");

    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    await db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        email TEXT UNIQUE,
        password TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`
    );

    console.log("Connected to SQLite database:", dbPath);
    return db;
  } catch (err) {
    console.error("Failed to connect to SQLite database:", err.message);
    throw err;
  }
}
