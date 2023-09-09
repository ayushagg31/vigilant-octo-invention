import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { createVectorStore } from "../config/qdrant.config.js";
import { AudioLoader } from "./transcribe-audio.mjs";
import { addCollection } from "../services/firestore.service";
import "dotenv/config";

export const ingestData = async ({
  collectionId,
  collectionName,
  ytUrl = null,
  pdfUrl = null,
  fileName,
  fileType,
  userEmail,
}) => {
  try {
    let loader;
    const filePath = `public/${
      fileType === "mp3" ? "audios" : "pdfs"
    }/${fileName}`;

    if (!userEmail) throw new Error("User info missing");

    switch (fileType) {
      case "pdf":
        loader = new PDFLoader(filePath);
        break;
      case "mp3":
        loader = await AudioLoader(filePath);
        break;
      default: {
        console.error(`${fileType} not supported`);
        throw new Error(`${fileType} not supported`);
      }
    }

    const rawText = await loader.load();
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    // split text into chunks
    const docs = await textSplitter.splitDocuments(rawText);
    // this shit cost money, use frugally
    // await createVectorStore(docs, collectionId);

    await addCollection({
      collectionId,
      collectionName,
      ytUrl,
      pdfUrl,
      fileType,
      userEmail,
    });
  } catch (err) {
    console.error("Ingestion failed", err);
    throw new Error(err.message);
  }
};
