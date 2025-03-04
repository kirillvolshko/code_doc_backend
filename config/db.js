import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  password: process.env.PASSWORD,
  host: "localhost",
  port: 5432,
  database: "code_doc",
});

export default pool;
