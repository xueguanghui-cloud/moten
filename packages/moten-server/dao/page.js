import Joi from "joi";
import { response } from "../utils/response.js";
import { query } from "../common/mysql.js";
import { daoErrorHandler } from "../utils/dao-error.js";
import dayjs from "dayjs";
export class PageDao {
  async findAll(page = 1, size = 10, id) {
    const sql = id
      ? `SELECT * FROM page WHERE page_id < ? ORDER BY page_id DESC LIMIT ?`
      : `SELECT * FROM page ORDER BY page_id DESC LIMIT ?,?`;

    const params = (id ? [id, size] : [(page - 1) * size, size]).map(String);
    const result = await daoErrorHandler(() => query(sql, params));
    return result;
  }
  async findOne(id) {
    const sql = `SELECT * FROM page WHERE page_id = ?`;

    const params = [id].map(String);
    const result = await daoErrorHandler(() => query(sql, params));
    return result;
  }
  async create(body) {
    const keys = Object.keys(body);
    const values = Object.values(body);
    const realKeys = [...keys, "create_time", "update_time"];
    const sqlKeys = realKeys.join(",");
    const sqlValues = realKeys.map((v) => `?`).join(",");
    const sql = `INSERT INTO page (${sqlKeys}) VALUES (${sqlValues})`;
    const time = dayjs().format();
    const params = [...values, time, time].map(String);
    const result = await daoErrorHandler(() => query(sql, params));
    return result;
  }
  async update(id, body) {
    const keys = Object.keys(body);
    const values = Object.values(body);
    const realKeys = [...keys, "update_time"];
    const sqlKeys = realKeys.map((v) => `${v} = ?`).join(",");
    const sql = `UPDATE page SET ${sqlKeys} WHERE page_id = ? LIMIT 1`;
    const time = dayjs().format();
    const params = [...values, time, id].map(String);
    const result = await daoErrorHandler(() => query(sql, params));
    return result;
  }
  async remove(id) {
    const sql = `DELETE FROM page WHERE page_id = ? LIMIT 1`;
    const params = [id].map(String);
    const result = await daoErrorHandler(() => query(sql, params));
    return result;
  }
}
