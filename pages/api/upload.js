// pages/api/upload
import { ingestData } from "../../scripts/ingest-data.mjs";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import UsageMiddleware from "../../middlewares/UsageMiddleware";
import UploadMiddleware from "../../middlewares/UploadMiddleware";
import PlanMiddleware from "../../middlewares/PlanMiddleware";
import { uploadObject } from "../../services/r2.service";
import { plans } from "../../config/plan.config";
import pdfjs from "pdfjs-dist";
import AuthorizeMiddleware from "../../middlewares/AuthorizeMiddleware";
import logger from "../../services/logging.service";

const uploadHandler = async (req, res) => {
  const file = req.file;
  const userEmail = req?.context?.user?.email;

  if (!userEmail) {
    logger.info(`Missing required data ${req?.context?.user}`);
    return res.status(400).json({ message: "Missing required data" });
  }
  try {
    const currentPlan = plans[req.headers["X-Plan-Type"]];
    const { MAX_PDF_PAGE_COUNT, MAX_PDF_SIZE_MB } = currentPlan;

    const fileType = file?.originalname?.split(".").pop();
    const collectionId = uuidv4();
    const collectionName = file?.originalname;
    const filePath = `uploads/${collectionId}.${fileType}`;

    if (fileType === "pdf") {
      const pdfData = new Uint8Array(file.buffer);
      const pdfDocument = await pdfjs.getDocument({ data: pdfData }).promise;
      const numPages = pdfDocument.numPages;
      const fileSizeBytes = file.buffer.length;
      const fileSizeMB = fileSizeBytes / (1024 * 1024);

      if (numPages > MAX_PDF_PAGE_COUNT || fileSizeMB > MAX_PDF_SIZE_MB) {
        return res.status(400).json({
          error: "PDF exceeds page count or size limits. Consider upgrading to Pro Tier",
        });
      }
    } else {
      logger.info(
        `Filetype not supported yet fileType: ${fileType} Originalname: ${file.originalname}`
      );
      return res.status(400).json({
        error: "Filetype not supported yet. If you would like us to support this file type in the future, consider creating a request.",
      });
    }

    await uploadObject({
      bucketName: "pdfs",
      objectKey: collectionId,
      buffer: file.buffer,
    });

    fs.writeFile(filePath, file.buffer, async (err) => {
      if (err) {
        logger.error(`Failed to write file in disk  - /api/upload ${err}`);
        return res.status(500).json({ error: "Failed to write file in disk" });
      } else {
        try {
          await ingestData({
            collectionId,
            collectionName,
            filePath,
            fileType,
            userEmail,
          });

          logger.info(
            `File uploaded and ingested successfully  ${collectionId} ${userEmail}`
          );

          return res.status(200).json({
            message: "File uploaded and ingested successfully",
            collectionId,
            collectionName,
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
      err
    );
    return res.status(500).json({ error: "Something went wrong, Please try again later." });
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
