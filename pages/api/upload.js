// pages/api/upload.js
import multer from "multer";
import fs from "fs";
import { ingestData } from "../../scripts/ingest-data.mjs";

const upload = multer({
  storage: multer.memoryStorage(), // Use in-memory storage for simplicity
});

const uploadHandler = async (req, res) => {
  const uploader = upload.single("file");
  uploader(req, res, (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Something went wrong" });
    }

    const file = req.file;
    fs.writeFile(`docs/${file.originalname}`, file.buffer, (err) => {
      if (err) console.log(err);
      else {
        console.log("File written successfully\n");
      }
    });
    ingestData(file.originalname).then((res) => {
      console.log("Ingestion complete");
    });
    return res.status(200).json({ message: "File uploaded successfully" });
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (req.method === "POST") {
    return uploadHandler(req, res);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
