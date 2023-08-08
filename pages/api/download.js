// pages/api/download.js
import { ingestData } from "../../scripts/ingest-data.mjs";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import fs from "fs";

const downloadHandler = async (req, res) => {
  try {
    const { pdfUrl } = req.body;
    // const extractedFilename = url.pathname.split("/").pop();
    const fileType = "pdf";
    const collectionName = uuidv4();
    const fileName = `${collectionName}.${fileType}`;

    const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
    const pdfContent = Buffer.from(response.data, "binary");

    fs.writeFile(`public/pdfs/${fileName}`, pdfContent, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to write file in disk" });
      } else {
        console.log(`PDF saved as ${fileName}`);
        try {
          await ingestData(collectionName, fileName, fileType);
          console.log("Ingestion complete");
          return res.status(200).json({
            message: "File uploaded and ingested successfully",
            collectionName,
          });
        } catch (error) {
          console.error("Ingestion Failed", error);
          return res.status(500).json({ error: error.message });
        }
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      return await downloadHandler(req, res);
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
