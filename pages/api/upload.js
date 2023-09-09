// pages/api/upload.js
import { ingestData } from "../../scripts/ingest-data.mjs";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { AuthorizeHandler } from "../../middlewares/AuthMiddleware.ts";

const upload = multer({
  storage: multer.memoryStorage(), // Use in-memory storage for simplicity
});

const uploadHandler = (req, res) => {
  try {
    const uploader = upload.single("file");
    const userId = req?.context?.user.user_id;
    console.log(userId, "userId");
    uploader(req, res, (error) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ error: "Failed to upload file in memory" });
      }
      const file = req.file;
      const fileType = file.originalname.split(".").pop();
      const collectionId = uuidv4();
      const fileName = `${collectionId}.${fileType}`;
      fs.writeFile(`public/pdfs/${fileName}`, file.buffer, async (err) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "Failed to write file in disk" });
        } else {
          console.log("File written successfully");
          try {
            await ingestData({
              collectionId,
              collectionName: file.originalname,
              fileName,
              fileType,
              userId,
            });
            console.log("Ingestion complete");
            return res.status(200).json({
              message: "File uploaded and ingested successfully",
              collectionId,
            });
          } catch (error) {
            console.error("Ingestion Failed", error);
            return res.status(500).json({ error: error.message });
          }
        }
      });
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req, res) {
  try {
    if (req.method === "POST") {
      return uploadHandler(req, res);
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export default AuthorizeHandler(handler);
