// pages/api/upload.js
import { ingestData } from "../../scripts/ingest-data.mjs";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const upload = multer({
  storage: multer.memoryStorage(), // Use in-memory storage for simplicity
});

const uploadHandler = (req, res) => {
  try {
    const uploader = upload.single("file");
    uploader(req, res, (error) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ error: "Failed to upload file in memory" });
      }
      const file = req.file;
      const fileType = file.originalname.split(".").pop();
      const collectionName = uuidv4();
      const fileName = `${collectionName}.${fileType}`;
      fs.writeFile(`public/pdfs/${fileName}`, file.buffer, async (err) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "Failed to write file in disk" });
        } else {
          console.log("File written successfully");
          try {
            await ingestData(collectionName, fileName, fileType);
            console.log("Ingestion complete");
            return res.status(200).json({
              message: "File uploaded and ingested successfully",
              collectionName
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

export default async function handler(req, res) {
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
