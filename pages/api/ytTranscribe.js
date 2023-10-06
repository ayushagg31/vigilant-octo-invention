// pages/api/ytTranscribe.js
import UsageMiddleware from "../../middlewares/UsageMiddleware";
import PlanMiddleware from "../../middlewares/PlanMiddleware";
import AuthorizeMiddleware from "../../middlewares/AuthorizeMiddleware";
import { plans } from "../../config/plan.config";
import { ingestData } from "../../scripts/ingest-data.mjs";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import ytdl from "ytdl-core";
import { YoutubeTranscript } from "youtube-transcript";
import logger from "../../services/logging.service";

async function checkFileSize(filePath, maxFileSizeMB) {
  try {
    const stats = await fs.promises.stat(filePath);
    const fileSizeInBytes = stats.size;
    const fileSizeMB = fileSizeInBytes / (1024 * 1024);

    if (fileSizeMB < maxFileSizeMB) {
      return true; // allow
    } else {
      return false; // deny
    }
  } catch (err) {
    throw new Error(`Error reading file stats:, ${err}`);
  }
}

function checkVideoLength(lengthSeconds, maxVideoLengthSeconds) {
  if (lengthSeconds) {
    return lengthSeconds < maxVideoLengthSeconds;
  }
  return true;
}

const ytHandler = async (req, res) => {
  const { ytUrl } = req.body;
  const userEmail = req?.context?.user?.email;

  if (!userEmail) {
    return res.status(400).json({ message: "Missing required data" });
  }

  try {
    const currentPlan = plans[req.headers["X-Plan-Type"]];
    const { MAX_VIDEO_SIZE_MB, MAX_VIDEO_LENGTH_SECONDS } = currentPlan;
    const fileType = "mp3";
    const collectionId = uuidv4();

    const videoInfo = await ytdl.getInfo(ytUrl);
    const videoTitle = videoInfo?.videoDetails?.title;
    const videoLengthSeconds = videoInfo?.videoDetails?.lengthSeconds;

    let filePath = null;
    let ytTranscript = null;

    try {
      ytTranscript = await YoutubeTranscript.fetchTranscript(ytUrl);
    } catch (error) {
      logger.warn("Error fetching the youtube transcript", error);
      // Handle error when transcript is disabled
      if (error?.message?.includes("Transcript is disabled for this video")) {
        logger.warn(
          `Transcript is disabled for this video - /api/ytTranscribe - userEmail: ${userEmail}, collectionId: ${collectionId}, ytUrl: ${ytUrl}`,
          error
        );
      }
      try {
        const isVideoLengthWithinLimit = checkVideoLength(
          videoLengthSeconds,
          MAX_VIDEO_LENGTH_SECONDS
        );
        if (!isVideoLengthWithinLimit) {
          return res.status(400).json({
            error: `Video duration exceeds the maximum allowed limit. Consider upgrading to Pro Tier`,
          });
        }

        // audio streaming code here
        const audioStream = ytdl(ytUrl, {
          filter: "audioonly",
          quality: "lowestaudio",
        });

        filePath = `uploads/${collectionId}.${fileType}`;
        await new Promise((resolve, reject) => {
          audioStream.pipe(fs.createWriteStream(filePath));
          audioStream.on("finish", () => {
            logger.info(`Audio downloaded successfully - ${collectionId}`);
            resolve();
          });

          audioStream.on("error", (err) => {
            logger.error(
              `Ingestion Failed - /api/ytTranscribe - userEmail: ${userEmail}, collectionId: ${collectionId}`,
              err
            );
            reject(err);
          });
        });

        const isFileSizeWithinLimit = await checkFileSize(
          filePath,
          MAX_VIDEO_SIZE_MB
        );
        if (!isFileSizeWithinLimit) {
          fs.promises
            .unlink(filePath) // Non-blocking unlink
            .then(() => {
              logger.info(`File deleted successfully ${collectionId}`);
            })
            .catch((err) => {
              logger.error(`Error deleting the file: ${collectionId}`, err);
            });

          return res
            .status(400)
            .json({
              error: `Exceeding maximum allowed file limit. Consider upgrading to Pro Tier`,
            });
        }
      } catch (err) {
        logger.error(
          `Error downloading audio - /api/ytTranscribe - userEmail: ${userEmail}, `,
          err
        );
        return res.status(500).json({ error: `Error downloading audio` });
      }
    }
    try {
      await ingestData({
        collectionId,
        collectionName: videoTitle,
        ytUrl,
        fileType,
        userEmail,
        filePath,
        ytTranscript,
      });

      logger.info(
        `Transcription and Ingestion complete using ytTranscript - ${collectionId}, ${ytUrl}, ${userEmail}`
      );
      return res.status(200).json({
        message: "File transcribed and ingested successfully",
        collectionName: videoTitle,
        collectionId,
        ytUrl,
      });
    } catch (err) {
      logger.error(
        `Ingestion Failed - /api/ytTranscribe - userEmail: ${userEmail}, collectionId: ${collectionId}`,
        error
      );
      return res.status(500).json({ error: `Ingestion Failed` });
    }
  } catch (err) {
    logger.error(
      `Failed to transcribe - /api/ytTranscribe - userEmail: ${userEmail}`,
      err
    );
    return res.status(500).json({ error: `Failed to transcribe` });
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
        logger.error("/api/ytTranscribe", err);
        return res.status(500).json({ error: err.message });
      }
    })
  )
);
