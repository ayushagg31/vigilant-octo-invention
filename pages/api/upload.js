// pages/api/upload
import { ingestData } from "../../scripts/ingest-data.mjs";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import UsageMiddleware from "../../middlewares/UsageMiddleware";
import UploadMiddleware from "../../middlewares/UploadMiddleware";
import PlanMiddleware from "../../middlewares/PlanMiddleware";
import { plans } from "../../config/plan.config";
import pdfjs from "pdfjs-dist";
import AuthorizeMiddleware from "../../middlewares/AuthorizeMiddleware";
import logger from "../../services/logging.service";

const uploadHandler = async (req, res) => {
  const file = req.file;
  const userEmail = req?.context?.user?.email;

  if (!userEmail) {
    logger.debug("Missing required data", req?.context?.user);
    return res.status(400).json({ message: "Missing required data" });
  }
  try {
    const currentPlan = plans[req.headers["X-Plan-Type"]];
    const { MAX_PDF_PAGE_COUNT, MAX_PDF_SIZE_MB } = currentPlan;

    const fileType = file.originalname.split(".").pop();
    const collectionId = uuidv4();
    const fileName = `${collectionId}.${fileType}`;

    if (fileType === "pdf") {
      const pdfData = new Uint8Array(file.buffer);
      const pdfDocument = await pdfjs.getDocument({ data: pdfData }).promise;
      const numPages = pdfDocument.numPages;
      const fileSizeBytes = file.buffer.length;
      const fileSizeMB = fileSizeBytes / (1024 * 1024);

      if (numPages > MAX_PDF_PAGE_COUNT || fileSizeMB > MAX_PDF_SIZE_MB) {
        return res.status(400).json({
          error: "PDF exceeds page count or size limits",
        });
      }
    } else {
      logger.info(
        `Filetype not supported yet fileType: ${fileType} Originalname: ${file.originalname}`
      );
      return res.status(400).json({
        error: "Filetype not supported yet",
      });
    }

    fs.writeFile(`public/pdfs/${fileName}`, file.buffer, async (err) => {
      if (err) {
        logger.error(`Failed to write file in disk  - /api/upload ${err}`);
        return res.status(500).json({ error: "Failed to write file in disk" });
      } else {
        try {
          await ingestData({
            collectionId,
            collectionName: file.originalname,
            fileName,
            fileType,
            userEmail,
          });
          logger.info(`File uploaded and ingested successfully`, {
            collectionId,
            collectionName: file.originalname,
            fileName,
            fileType,
            userEmail,
          });
          return res.status(200).json({
            message: "File uploaded and ingested successfully",
            collectionId,
          });
        } catch (error) {
          logger.error(
            `Ingestion Failed - /api/upload - userEmail: ${userEmail}, collectionId: ${collectionId}`,
            error
          );
          return res.status(500).json({ error: "Ingestion Failed" });
        }
      }
    });
  } catch (err) {
    logger.error(
      `Ingestion Failed - /api/upload - userEmail: ${userEmail}, collectionId: ${collectionId}`,
      error
    );
    return res.status(500).json({ error: err.message });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default AuthorizeMiddleware(
  UploadMiddleware(
    PlanMiddleware(
      UsageMiddleware(async function handler(req, res) {
        try {
          if (req.method === "POST") {
            return uploadHandler(req, res);
          } else {
            res.status(405).json({ error: "Method Not Allowed" });
          }
        } catch (err) {
          logger.error("/api/upload", error);
          return res.status(500).json({ error: err.message });
        }
      })
    )
  )
);
