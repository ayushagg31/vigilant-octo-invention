import fs from "fs";
import { openai } from "../config/openai.config";
import { Document } from "langchain/document";
import logger from "../services/logging.service";

// Convert audio to text using openAI whisper
export const AudioLoader = async (filePath) => {
  try {
    const transcript = await openai.createTranscription(
      fs.createReadStream(filePath),
      "whisper-1"
    );
    if (transcript?.data?.text) {
      fs.unlink(filePath, (err) => {
        if (err) {
          logger.error("Error deleting the file:", filePath, err);
        } else {
          logger.info("File deleted successfully", filePath);
        }
      });
    }
    return {
      load: () => [new Document({ pageContent: transcript.data.text })],
    };
  } catch (err) {
    logger.error("Failed to transcribe", err);
    throw new Error(`Failed to transcribe: ${err.message}`);
  }
};
