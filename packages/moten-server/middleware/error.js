import { response } from "../utils/response.js";

export const error404Handler = (req, res, next) => {
  res.json(response.apiNotFound());
};

export const errorHandler = (err, req, res, next) => {
  res.json(response.fail(err));
};
