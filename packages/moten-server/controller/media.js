import multer from "multer";
import MAO from "multer-aliyun-oss";
import { response } from "../utils/response.js";
import { ACCESS_KEY_ID, ACCESS_KEY_SECRET } from "../config/index.js";

export class MediaController {
  upload() {
    const handler = async (req, res) => {
      const upload = multer({
        storage: MAO({
          config: {
            region: "oss-cn-shanghai",
            accessKeyId: ACCESS_KEY_ID,
            accessKeySecret: ACCESS_KEY_SECRET,
            bucket: "moten-oss-xgh",
          },
        }),
      });

      const singleFileUpload = upload.single("file");
      singleFileUpload(req, res, function (err) {
        if (!req.file) {
          return res.json(response.validateFailed());
        }
        if (err) {
          res.json(response.fail(err));
        } else {
          res.json(response.success({ url: req.file.url }));
        }
      });
    };
    return [handler];
  }
}
