import Joi from "joi";
import jwt from "jsonwebtoken";
import { userDao } from "../dao/index.js";
import validate from "../middleware/validate.js";
import { response } from "../utils/response.js";
import { SECRET_KEY } from "../config/index.js";

export class UserController {
  register() {
    // 验证参数
    const rules = Joi.object({
      username: Joi.string().min(6).max(20).required(),
      password: Joi.string().min(8).max(32).required(),
    });
    const handler = async (req, res) => {
      const { status, message, result } = await userDao.register(req.body);
      if (!status) return res.json(response.fail(message));

      res.json(response.success(result));
    };
    return [validate(rules, "body"), handler];
  }

  login() {
    // 验证参数
    const rules = Joi.object({
      username: Joi.string().min(6).max(20).required(),
      password: Joi.string().min(8).max(32).required(),
    });
    const handler = async (req, res) => {
      const { status, message, result } = await userDao.login(req.body);
      if (!status) return res.json(response.fail(message));

      if (result && result.length > 0) {
        const resObj = result[0];

        const token = jwt.sign({ id: resObj.user_id }, SECRET_KEY, { expiresIn: "24h" });
        res.json(response.success({ ...resObj, token }));
      } else {
        res.json(response.authorizeFailed());
      }
    };
    return [validate(rules, "body"), handler];
  }
}
