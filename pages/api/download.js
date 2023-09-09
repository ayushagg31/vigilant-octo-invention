// pages/api/download.js
import { ingestData } from "../../scripts/ingest-data.mjs";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import fs from "fs";
import pdfjs from "pdfjs-dist";
import UsageMiddleware from "../../middlewares/UsageMiddleware";
import PlanMiddleware from "../../middlewares/PlanMiddleware";
import { plans } from "../../config/plan.config";
import AuthorizeMiddleware from "../../middlewares/AuthorizeMiddleware";

const downloadHandler = async (req, res) => {
  try {
    const { pdfUrl } = req.body;
    const userEmail = req?.context?.user?.email;
    if (!userEmail) {
      return res.status(400).json({ message: "Missing required data" });
    }
    const currentPlan = plans[req.headers["X-Plan-Type"]];
    const { MAX_PDF_PAGE_COUNT, MAX_PDF_SIZE_MB } = currentPlan;

    const fileType = "pdf";
    const collectionId = uuidv4();
    const fileName = `${collectionId}.${fileType}`;
    const fileOriginalname = pdfUrl.substring(pdfUrl.lastIndexOf("/") + 1);

    const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
    const pdfContent = Buffer.from(response.data, "binary");
    const pdfData = new Uint8Array(pdfContent);
    const pdfDocument = await pdfjs.getDocument({ data: pdfData }).promise;
    const numPages = pdfDocument.numPages;
    const pdfSizeInBytes = pdfData.length;
    const pdfSizeInMB = pdfSizeInBytes / (1024 * 1024);

    if (numPages > MAX_PDF_PAGE_COUNT || pdfSizeInMB > MAX_PDF_SIZE_MB) {
      return res.status(400).json({
        error: "PDF exceeds page count or size limits",
      });
    }

    fs.writeFile(`public/pdfs/${fileName}`, pdfContent, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to write file in disk" });
      } else {
        console.log(`PDF saved as ${fileName}`);
        try {
          await ingestData({
            collectionId,
            collectionName: fileOriginalname,
            pdfUrl,
            fileName,
            fileType,
            userEmail,
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
  } catch (err) {
    console.error("Failed to download pdf", err);
    return res.status(500).json({ error: err.message });
  }
};

export default AuthorizeMiddleware(
  PlanMiddleware(
    UsageMiddleware(async function handler(req, res) {
      try {
        if (req.method === "POST") {
          return await downloadHandler(req, res);
        } else {
          res.status(405).json({ error: "Method Not Allowed" });
        }
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    })
  )
);
