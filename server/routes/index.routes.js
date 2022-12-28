import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get('/ping', async (req, res) => {
  const [query] = await pool.query("SELECT 1+2 as result");
  console.log(query);
  res.json('ping');
});
export default router;
