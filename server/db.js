import { createPool } from "mysql2/promise";

export const pool = new createPool({
  host: 'localhost',
  user: 'root',
  password: 'fazt',
  database: 'tasksdb',
  port: 3306
});