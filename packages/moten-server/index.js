import cors from "cors";
import express from "express";
import "express-async-errors";
import { error404Handler, errorHandler } from "./middleware/error.js";
import { pageController } from "./controller/index.js";
import { query } from "./common/mysql.js";

const app = express();
const port = 8081;

app.use(cors()); // 解决跨域问题

app.listen(port, () => {
  console.log(`moten app listening on port http://localhost:${port}`);
});

app.get("/rest/v1/page", pageController.findAll());
// app.get("/rest/v1/page/:pageId", pageController.findOne());
// app.post("/rest/v1/page/create", pageController.create());
// app.post("/rest/v1/page/delete", pageController.remove());
// app.post("/rest/v1/page/update", pageController.update());

app.use(errorHandler);

app.use("*", error404Handler);
