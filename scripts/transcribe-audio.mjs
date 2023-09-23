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
    return {
      load: () => [new Document({ pageContent: transcript.data.text })],
    };
  } catch (err) {
    logger.error("Failed to transcribe", err);
    throw new Error(`Failed to transcribe: ${err.message}`);
  }
};
