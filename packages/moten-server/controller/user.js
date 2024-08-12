import Joi from "joi";
import _ from "lodash";
import { response } from "../utils/response.js";
import validate from "../middleware/validate.js";
import { userDao } from "../dao/index.js";

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
}
