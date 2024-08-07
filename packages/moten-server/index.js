import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors()); // 解决跨域问题

app.get("/", (req, res) => {
  res.send({ name: "Hello World!" });
});

app.listen(port, () => {
  console.log(`moten app listening on port http://localhost:${port}`);
});
