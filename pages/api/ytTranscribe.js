// pages/api/ytTranscribe.js

import UsageMiddleware from "../../middlewares/UsageMiddleware";
import PlanMiddleware from "../../middlewares/PlanMiddleware";
import AuthorizeMiddleware from "../../middlewares/AuthorizeMiddleware";
import { plans } from "../../config/plan.config";
import { ingestData } from "../../scripts/ingest-data.mjs";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import ytdl from "ytdl-core";
import logger from "../../services/logging.service";

const ytHandler = async (req, res) => {
  const { ytUrl } = req.body;
  const userEmail = req?.context?.user?.email;

  if (!userEmail) {
    return res.status(400).json({ message: "Missing required data" });
  }
  try {
    const currentPlan = plans[req.headers["X-Plan-Type"]];
    const { MAX_VIDEO_SIZE_MB } = currentPlan;

    const fileType = "mp3";
    const collectionId = uuidv4();

    const filePath = `uploads/${collectionId}.${fileType}`;

    const videoInfo = await ytdl.getInfo(ytUrl);
    const videoTitle = videoInfo?.videoDetails?.title;

    await ytdl(ytUrl, { filter: "audioonly" })
      .pipe(fs.createWriteStream(filePath))
      .on("finish", async () => {
        logger.info(`Audio downloaded successfully - ${collectionId}`);
        await fs.stat(filePath, async (err, stats) => {
          if (err) {
            logger.error("Error reading file stats:", err);
            return res.status(500).json({ error: `Error reading file stats` });
          }
          const fileSizeInBytes = stats.size;
          const fileSizeMB = fileSizeInBytes / (1024 * 1024);
          if (fileSizeMB < MAX_VIDEO_SIZE_MB) {
            try {
              await ingestData({
                collectionId,
                collectionName: videoTitle,
                ytUrl,
                filePath,
                fileType,
                userEmail,
              });
              logger.info("Transcription and Ingestion complete", {
                collectionId,
                collectionName: videoTitle,
                ytUrl,
                fileType,
                userEmail,
              });
              return res.status(200).json({
                message: "File transcribed and ingested successfully",
                videoTitle,
                collectionId,
                ytUrl,
              });
            } catch (error) {
              logger.error(
                `Ingestion Failed - /api/ytTranscribe - userEmail: ${userEmail}, collectionId: ${collectionId}`,
                error
              );
              return res.status(500).json({ error: error.message });
            }
          } else {
            fs.unlink(filePath, (err) => {
              if (err) {
                logger.error("Error deleting the file:", collectionId, err);
              } else {
                logger.info("File deleted successfully", collectionId);
              }
            });
            return res
              .status(400)
              .json({ error: `Exceeding maximum allowed file limit` });
          }
        });
      })
      .on("error", (err) => {
        logger.error(
          `Error downloading audio - /api/ytTranscribe - userEmail: ${userEmail}, `,
          err
        );
        return res.status(500).json({ error: `Error downloading audio` });
      });
  } catch (err) {
    logger.error(
      `Failed to transcribe - /api/ytTranscribe - userEmail: ${userEmail}`,
      err
    );
    return res
      .status(500)
      .json({ error: `Failed to transcribe: ${err.message}` });
  }
};

export default AuthorizeMiddleware(
  PlanMiddleware(
    UsageMiddleware(async function handler(req, res) {
      try {
        if (req.method === "POST") {
          return await ytHandler(req, res);
        } else {
          res.status(405).json({ error: "Method Not Allowed" });
        }
      } catch (err) {
        logger.error("/api/ytTranscribe", error);
        return res.status(500).json({ error: err.message });
      }
    })
  )
);
