const SUCCESS = { code: 200, message: "success" };
const FAILED = { code: 500, message: "fail" };
const VALIDATE_FAILED = { code: 400, message: "param validate failed" };
const API_NOT_FOUNT = { code: 404, message: "api does not exist" };

class Response {
  /**
   * 返回code
   */
  code;
  /**
   * 返回说明
   */
  message;
  /**
   * 返回数据
   */
  data;

  /**
   *
   * @param {number} code 返回code
   * @param {string} message 返回说明
   * @param {any} data 返回数据
   */
  constructor(code, message, data) {
    this.code = code;
    this.message = message || "";
    this.data = data || null;
  }

  /**
   * 成功
   * @param {*} data
   */
  static success(data) {
    return new Response(SUCCESS.code, SUCCESS.message, data);
  }

  /**
   * 失败
   * @param {*} messagge
   */
  static fail(message = "") {
    return new Response(FAILED.code, FAILED.message + message);
  }

  /**
   * 参数校验失败
   * @param {*} keys
   */
  static validateFailed(keys) {
    return new Response(VALIDATE_FAILED.code, VALIDATE_FAILED.message + `${keys ? ": " + keys : ""}`);
  }

  /**
   * 接口不存在
   */
  static apiNotFound() {
    return new Response(API_NOT_FOUNT.code, API_NOT_FOUNT.message);
  }
}

export const response = Response;
