import Joi from "joi";
import { response } from "../utils/response.js";
import { pageDao } from "../dao/index.js";
import validate from "../middleware/validate.js";
import _ from "lodash";

export class PageController {
  findAll() {
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
  findOne() {
    // 验证参数
    const rules = Joi.object({
      id: Joi.number().optional(),
    });
    const handler = async (req, res) => {
      const { id } = req.params;
      const { status, message, result } = await pageDao.findOne(id);
      if (!status) return res.json(response.fail(message));

      res.json(response.success(result));
    };
    return [validate(rules), handler];
  }
  create() {
    // 验证参数
    const rules = Joi.object({
      name: Joi.string().optional(),
      content: Joi.string().optional(),
    });
    const handler = async (req, res) => {
      const { status, message, result } = await pageDao.create(req.body);
      if (!status) return res.json(response.fail(message));

      res.json(response.success(result));
    };
    return [validate(rules, "body"), handler];
  }
  update() {
    // 验证参数
    const rules = Joi.object({
      id: Joi.number().required(),
      name: Joi.string().optional(),
      content: Joi.string().optional(),
    });
    const handler = async (req, res) => {
      const { id } = req.body;
      const pickBody = _.omit(req.body, ["id"]);
      const { status, message, result } = await pageDao.update(id, pickBody);
      if (!status) return res.json(response.fail(message));

      res.json(response.success(result));
    };
    return [validate(rules, "body"), handler];
  }
  remove() {
    // 验证参数
    const rules = Joi.object({
      id: Joi.number().required(),
    });
    const handler = async (req, res) => {
      const { id } = req.body;
      const { status, message, result } = await pageDao.remove(id);
      if (!status) return res.json(response.fail(message));

      res.json(response.success(result));
    };
    return [validate(rules, "body"), handler];
  }
}
