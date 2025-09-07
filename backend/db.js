import sqlite3 from "sqlite3";
import { open } from "sqlite";

const db = await open({
  filename: "./users.db",
  driver: sqlite3.Database,
});

console.log("Connected to users.db");

export default db;
