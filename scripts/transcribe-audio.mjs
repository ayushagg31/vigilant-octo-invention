import fs from "fs";
import { openai } from "../config/openai.config";
import { Document } from "langchain/document";

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
          console.error("Error deleting the file:", err);
        } else {
          console.log("File deleted successfully");
        }
      });
    }
    return {
      load: () => [new Document({ pageContent: transcript.data.text })],
    };
  } catch (err) {
    console.error("Failed to transcribe", err);
    throw new Error(`Failed to transcribe: ${err.message}`);
  }
};
