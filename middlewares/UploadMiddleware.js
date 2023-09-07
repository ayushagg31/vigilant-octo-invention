import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(), // Use in-memory storage for simplicity
});

const UploadMiddleware = function (handler) {
  return async function (req, res) {
    try {
      const uploader = upload.single("file");
      uploader(req, res, async (error) => {
        if (error) {
          console.error(error);
          return res
            .status(500)
            .json({ error: "Failed to upload file in memory" });
        }
        return handler(req, res);
      });
    } catch (error) {
      console.error(`UploadMiddleware error: ${error}`);
      return res
        .status(500)
        .json({ message: `Error while uploading docs. Error: ${error}` });
    }
  };
};

export default UploadMiddleware;
