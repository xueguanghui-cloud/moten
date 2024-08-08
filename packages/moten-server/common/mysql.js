import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "moten",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: "UTF8MB4_GENERAL_CI",
});

// 封装执行函数
export const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err instanceof Error) {
        reject(err);
        return;
      }
      connection.execute(sql, params, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
        pool.releaseConnection(connection);
      });
    });
  });
};
