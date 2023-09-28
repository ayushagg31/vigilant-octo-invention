// pages/api/download
import { ingestData } from "../../scripts/ingest-data.mjs";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import fs from "fs";
import pdfjs from "pdfjs-dist";
import UsageMiddleware from "../../middlewares/UsageMiddleware";
import PlanMiddleware from "../../middlewares/PlanMiddleware";
import { uploadObject } from "../../services/r2.service";
import { plans } from "../../config/plan.config";
import AuthorizeMiddleware from "../../middlewares/AuthorizeMiddleware";
import logger from "../../services/logging.service";

const downloadHandler = async (req, res) => {
  const { pdfUrl } = req.body;
  const userEmail = req?.context?.user?.email;
  if (!userEmail) {
    return res.status(400).json({ message: "Missing required data" });
  }
  try {
    const currentPlan = plans[req.headers["X-Plan-Type"]];
    const { MAX_PDF_PAGE_COUNT, MAX_PDF_SIZE_MB } = currentPlan;

    const fileType = "pdf";
    const collectionId = uuidv4();
    const collectionName = pdfUrl.substring(pdfUrl.lastIndexOf("/") + 1);
    const filePath = `uploads/${collectionId}.${fileType}`;

    const response = await axios.get(pdfUrl, {
      responseType: "arraybuffer",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
      },
    });
    const pdfContent = Buffer.from(response.data, "binary");
    const pdfData = new Uint8Array(pdfContent);
    const pdfDocument = await pdfjs.getDocument({ data: pdfData }).promise;
    const numPages = pdfDocument.numPages;
    const pdfSizeInBytes = pdfData.length;
    const pdfSizeInMB = pdfSizeInBytes / (1024 * 1024);

    if (numPages > MAX_PDF_PAGE_COUNT || pdfSizeInMB > MAX_PDF_SIZE_MB) {
      return res.status(400).json({
        error: "PDF exceeds the page count or size limits",
      });
    }

    await uploadObject({
      bucketName: "pdfs",
      objectKey: collectionId,
      buffer: pdfContent,
    });

    fs.writeFile(filePath, pdfContent, async (err) => {
      if (err) {
        logger.error(`Failed to write file in disk - /api/download ${err}`);
        return res.status(500).json({ error: "Failed to write file in disk" });
      } else {
        try {
          await ingestData({
            collectionId,
            collectionName,
            pdfUrl,
            filePath,
            fileType,
            userEmail,
          });
          logger.info(
            `File downloaded and ingested successfully  ${collectionId} ${pdfUrl} ${userEmail}`
          );
          return res.status(200).json({
            message: "File downloaded and ingested successfully",
            collectionName,
            collectionId,
          });
        } catch (error) {
          logger.error(
            `Ingestion Failed - /api/download - userEmail: ${userEmail}, collectionId: ${collectionId}`,
            error
          );
          return res.status(500).json({ error: "Ingestion Failed" });
        }
      }
    });
  } catch (err) {
    logger.error(`Failed to download document - userEmail: ${userEmail}`, err);
    return res.status(500).json({ error: "Failed to download document" });
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
        logger.error("/api/download", error);
        return res
          .status(500)
          .json({
            error:
              err.message || "Something went wrong, Please try again later",
          });
      }
    })
  )
);
