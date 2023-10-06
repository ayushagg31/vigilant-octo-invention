import fs from "fs";
import { openai } from "../config/openai.config";
import { Document } from "langchain/document";
import logger from "../services/logging.service";

async function getTranscription(filePath, ytTranscript) {
  if (ytTranscript) {
    logger.info("Leveraging video transcripton 😊");
    return ytTranscript.map((transcript) => transcript.text).join(" ");
  } else if (filePath) {
    const transcript = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: "whisper-1",
    });
    logger.info("Training on whisper 😔");
    return transcript.text;
  } else {
    throw new Error("Both filePath and transcription are required");
  }
}

// Convert audio to text using openAI whisper
export const AudioLoader = async (filePath, ytTranscript) => {
  try {
    const transcription = await getTranscription(filePath, ytTranscript);
    return {
      load: () => [new Document({ pageContent: transcription })],
    };
  } catch (error) {
    logger.error(`Failed to transcribe...`, error);
    throw new Error(`Failed to transcribe...: ${error}`);
  }
};
