import Joi from "joi";
import { response } from "../utils/response.js";
import { logDao } from "../dao/index.js";
import validate from "../middleware/validate.js";
import _ from "lodash";

export class LogController {
  findAll() {
    const rules = Joi.object({
      url: Joi.string().required(),
      url_unique: Joi.string().optional(),
      page: Joi.number().min(1).optional(),
      size: Joi.number().min(1).optional(),
    });
    const handler = async (req, res) => {
      const { page, size, url, url_unique } = req.query;
      const { status, message, result } = await logDao.findAll(page, size, url, url_unique);
      if (!status) return res.json(response.fail(message));

      res.json(response.success(result));
    };
    return [validate(rules), handler];
  }
}
