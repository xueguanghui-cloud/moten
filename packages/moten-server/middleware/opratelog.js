import { logDao } from "../dao/index.js";

export const opratelog = async (req, res, next) => {
  const obj = {
    user_id: req.auth.id,
    url: req.route.path,
    url_unique: req.body.id,
    body: JSON.stringify(req.body),
  };

  logDao.create(obj);
};
