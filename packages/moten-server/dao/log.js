import { query } from "../common/mysql.js";
import { daoErrorHandler } from "../utils/dao-error.js";
import dayjs from "dayjs";
export class LogDao {
  async findAll(page = 1, size = 10, url, url_unique) {
    const sql = `SELECT * FROM log WHERE url = ? AND url_unique = ? ORDER BY create_time DESC LIMIT ?, ?`;

    const params = [url, url_unique, (page - 1) * size, size].map(String);
    const result = await daoErrorHandler(() => query(sql, params));
    return result;
  }
  async create(body) {
    const keys = Object.keys(body);
    const values = Object.values(body);
    const realKeys = [...keys, "create_time"];
    const sqlKeys = realKeys.join(",");
    const sqlValues = realKeys.map((v) => `?`).join(",");
    const sql = `INSERT INTO log (${sqlKeys}) VALUES (${sqlValues})`;
    const time = dayjs().format();
    const params = [...values, time].map(String);
    const result = await daoErrorHandler(() => query(sql, params));
    return result;
  }
}
