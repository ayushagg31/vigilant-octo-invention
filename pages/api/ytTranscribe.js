// pages/api/ytTranscribe.js
import { ingestData } from "../../scripts/ingest-data.mjs";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import ytdl from "ytdl-core";

const ytHandler = async (req, res) => {
  try {
    const { ytUrl, userId } = req.body;
    const fileType = "mp3";
    const collectionId = uuidv4();
    const fileName = `${collectionId}.${fileType}`;
    const filePath = `public/audios/${fileName}`;
    const maxAllowedSize = 25000000; // 25MB in bytes
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
          if (fileSizeInBytes < maxAllowedSize) {
            try {
              await ingestData({
                collectionId,
                collectionName: videoTitle,
                ytUrl,
                fileName,
                fileType,
                userId,
              });
              console.log("Ingestion complete");
              return res.status(200).json({
                message: "File transcribed and ingested successfully",
                videoTitle,
                collectionId,
                ytUrl
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
              .status(500)
              .json({ error: `Exceeding maximum allowed file limit` });
          }
        });
      })
      .on("error", (err) => {
        console.error("Error downloading audio:", err);
        return res.status(500).json({ error: `Error downloading audio` });
      });
  } catch (err) {
    return res
      .status(500)
      .json({ error: `Failed to transcribe: ${err.message}` });
  }
};

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      return await ytHandler(req, res);
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
