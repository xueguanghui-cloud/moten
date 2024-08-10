import Joi from "joi";
import { response } from "../utils/response.js";
import { query } from "../common/mysql.js";
import { daoErrorHandler } from "../utils/dao-error.js";

export class PageDao {
  async findAll(page = 1, size = 10, id) {
    const sql = id
      ? `SELECT * FROM page WHERE page_id < ? ORDER BY page_id DESC LIMIT ?`
      : `SELECT * FROM page ORDER BY page_id DESC LIMIT ?,?`;

    const params = (id ? [id, size] : [(page - 1) * size, size]).map((item) => item.toString());
    console.log(params);
    const result = await daoErrorHandler(() => query(sql, params));
    return result;
  }
  findOne() {}
  create() {}
  update() {}
  remove() {}
}
