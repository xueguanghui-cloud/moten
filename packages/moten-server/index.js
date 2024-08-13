import cors from "cors";
import express from "express";
import "express-async-errors";
import { expressjwt } from "express-jwt";
import { pageController, userController } from "./controller/index.js";
import { error404Handler, errorHandler } from "./middleware/error.js";
import { SECRET_KEY } from "./config/index.js";
import { authFailedHandler } from "./middleware/auth.js";

const app = express();
const port = 8081;

app.use(cors()); // 解决跨域问题
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressjwt({ secret: SECRET_KEY, algorithms: ["HS256"] }).unless({
    path: ["/rest/v1/user/login", "/rest/v1/user/register"],
  })
);

app.listen(port, () => {
  console.log(`moten app listening on port http://localhost:${port}`);
});

// 页面
app.get("/rest/v1/page", pageController.findAll());
app.get("/rest/v1/page/:id", pageController.findOne());
app.post("/rest/v1/page/create", pageController.create());
app.post("/rest/v1/page/update", pageController.update());
app.post("/rest/v1/page/delete", pageController.remove());

// 用户
app.post("/rest/v1/user/register", userController.register());
app.post("/rest/v1/user/login", userController.login());
app.get("/rest/v1/user", userController.findAll());
app.post("/rest/v1/user/disable", userController.disable());

app.use(authFailedHandler);
app.use(errorHandler);
app.use("*", error404Handler);
