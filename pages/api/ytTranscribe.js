// pages/api/ytTranscribe.js

import UsageMiddleware from "../../middlewares/UsageMiddleware";
import PlanMiddleware from "../../middlewares/PlanMiddleware";
import AuthorizeMiddleware from "../../middlewares/AuthorizeMiddleware";
import { plans } from "../../config/plan.config";
import { ingestData } from "../../scripts/ingest-data.mjs";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import ytdl from "ytdl-core";

const ytHandler = async (req, res) => {
  try {
    const { ytUrl } = req.body;
    const userEmail = req?.context?.user?.email;

    if (!userEmail) {
      return res.status(400).json({ message: "Missing required data" });
    }

    const currentPlan = plans[req.headers["X-Plan-Type"]];
    const { MAX_VIDEO_SIZE_MB } = currentPlan;

    const fileType = "mp3";
    const collectionId = uuidv4();

    const fileName = `${collectionId}.${fileType}`;
    const filePath = `public/audios/${fileName}`;

    const videoInfo = await ytdl.getInfo(ytUrl);
    const videoTitle = videoInfo?.videoDetails?.title;

    await ytdl(ytUrl, { filter: "audioonly" })
      .pipe(fs.createWriteStream(filePath))
      .on("finish", async () => {
        console.log("Audio downloaded successfully.");
        await fs.stat(filePath, async (err, stats) => {
          if (err) {
            console.error("Error reading file stats:", err);
            return res
              .status(500)
              .json({ error: `Error reading file stats:', ${err.message}` });
          }
          const fileSizeInBytes = stats.size;
          const fileSizeMB = fileSizeInBytes / (1024 * 1024);
          if (fileSizeMB < MAX_VIDEO_SIZE_MB) {
            try {
              await ingestData({
                collectionId,
                collectionName: videoTitle,
                ytUrl,
                fileName,
                fileType,
                userEmail,
              });
              console.log("Ingestion complete");
              return res.status(200).json({
                message: "File transcribed and ingested successfully",
                videoTitle,
                collectionId,
                ytUrl,
              });
            } catch (error) {
              console.error("Ingestion Failed", error);
              return res.status(500).json({ error: error.message });
            }
          } else {
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error("Error deleting the file:", err);
              } else {
                console.log("File deleted successfully");
              }
            });
            console.error("Exceeding maximum allowed file limit", err);
            return res
              .status(400)
              .json({ error: `Exceeding maximum allowed file limit` });
          }
        });
      })
      .on("error", (err) => {
        console.error("Error downloading audio:", err);
        return res.status(500).json({ error: `Error downloading audio` });
      });
  } catch (err) {
    console.log("Error", err);
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
        return res.status(500).json({ error: err.message });
      }
    })
  )
);
