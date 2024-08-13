import dayjs from "dayjs";
import { query } from "../common/mysql.js";
import { daoErrorHandler } from "../utils/dao-error.js";
import { customAlphabet } from "nanoid";

export class UserDao {
  async register(body) {
    const { username, password } = body;
    const realKeys = ["user_id", "user_name", "password", "create_time"];
    const sqlKeys = realKeys.join(",");
    const sqlValues = realKeys.map((v) => `?`).join(",");
    const sql = `INSERT INTO user (${sqlKeys}) VALUES (${sqlValues})`;
    const time = dayjs().format();
    const id = customAlphabet("123456789abcdefghijklmnopqrstuvwxyz", 10)();
    const params = [id, username, password, time].map(String);
    const result = await daoErrorHandler(() => query(sql, params));
    return result;
  }

  async login(body) {
    const { username, password } = body;
    const sql = `SELECT user_id, user_name FROM user WHERE user_name = ? AND password = ?`;
    const params = [username, password].map(String);
    const result = await daoErrorHandler(() => query(sql, params));
    return result;
  }
}
