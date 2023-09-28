import multer from "multer";
import logger from "../services/logging.service";

const upload = multer({
  storage: multer.memoryStorage(), // Use in-memory storage for simplicity
});

const UploadMiddleware = function (handler) {
  return async function (req, res) {
    try {
      const uploader = upload.single("file");
      uploader(req, res, async (error) => {
        if (error) {
          logger.error("Failed to upload file in memory", error);
          return res
            .status(500)
            .json({ error: "Failed to upload file in memory" });
        }
        return handler(req, res);
      });
    } catch (error) {
      logger.error(`UploadMiddleware error: ${error}`);
      return res
        .status(500)
        .json({ message: `Failed to upload file in memory` });
    }
  };
};

export default UploadMiddleware;
