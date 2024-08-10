import Joi from "joi";
import { response } from "../utils/response.js";
import { pageDao } from "../dao/index.js";
import validate from "../middleware/validate.js";

export class PageController {
  findAll() {
    // 验证参数
    const rules = Joi.object({
      id: Joi.number().optional(),
      page: Joi.number().min(1).optional(),
      size: Joi.number().min(1).optional(),
    });
    const handler = async (req, res) => {
      const { page, size, id } = req.query;
      const { status, message, result } = await pageDao.findAll(page, size, id);
      if (!status) return res.json(response.fail(message));

      res.json(response.success(result));
    };
    return [validate(rules), handler];
  }
  findOne() {}
  create() {}
  update() {}
  remove() {}
}
