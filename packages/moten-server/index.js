import express from "express";
import cors from "cors";
import { query } from "./common/mysql.js";
import { response } from "./utils/response.js";
import { error404Handler, errorHandler } from "./middleware/error.js";
import "express-async-errors";

const app = express();
const port = 3000;

app.use(cors()); // 解决跨域问题

app.listen(port, () => {
  console.log(`moten app listening on port http://localhost:${port}`);
});

app.get("/111", async (req, res) => {
  const sql = `SELECT * FROM page WHERE page_id = ? LIMIT 1`;
  const params = [1];
  const result = await query(sql, params);
  res.json(response.success(result));
});

app.use(errorHandler);

app.use("*", error404Handler);
