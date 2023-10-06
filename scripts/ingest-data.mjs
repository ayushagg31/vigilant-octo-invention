import fs from "fs";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { createVectorStore } from "../config/qdrant.config.js";
import { AudioLoader } from "./transcribe-audio.mjs";
import { addCollection } from "../services/firestore.service";
import logger from "../services/logging.service";
import "dotenv/config";

export const ingestData = async ({
  collectionId,
  collectionName,
  filePath,
  ytUrl = null,
  pdfUrl = null,
  fileType,
  userEmail,
  ytTranscript,
}) => {
  try {
    let loader;

    if (!userEmail) throw new Error("User info missing");

    switch (fileType) {
      case "pdf":
        loader = new PDFLoader(filePath);
        break;
      case "mp3":
        loader = await AudioLoader(filePath, ytTranscript);
        break;
      default: {
        logger.error(`${fileType} not supported`);
        throw new Error(`${fileType} not supported`);
      }
    }

    const rawText = await loader.load();
    const textSplitter = new RecursiveCharacterTextSplitter({
      characters: ["\n\n", "\n", " ", "", ".", "?", "!"],
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    // split text into chunks
    const docs = await textSplitter.splitDocuments(rawText);
    // this shit cost money, use frugally
    await createVectorStore(docs, collectionId);

    await addCollection({
      collectionId,
      collectionName,
      ytUrl,
      pdfUrl,
      fileType,
      userEmail,
    });

    if (filePath) {
      fs.unlink(filePath, (err) => {
        if (err) {
          logger.error("Error deleting the file:", filePath, err);
        } else {
          logger.warn(`Uploded file deleted successfully ${collectionId}`);
        }
      });
    }
  } catch (err) {
    logger.error("Ingestion failed - inside ingest-data", err);
    throw new Error(err);
  }
};
