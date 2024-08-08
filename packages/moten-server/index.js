import express from "express";
import cors from "cors";
import { query } from "./common/mysql.js";

const app = express();
const port = 3000;

app.use(cors()); // 解决跨域问题

app.get("/", async (req, res) => {
  const sql = `SELECT * FROM page WHERE page_id = ? LIMIT 1`;
  const params = [1];
  const result = await query(sql, params);
  res.json(result);
});

app.listen(port, () => {
  console.log(`moten app listening on port http://localhost:${port}`);
});
