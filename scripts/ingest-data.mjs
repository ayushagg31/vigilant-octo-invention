import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { createVectorStore } from "../config/qdrant.config.js";
import { SRTLoader } from "langchain/document_loaders/fs/srt";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { EPubLoader } from "langchain/document_loaders/fs/epub";
// import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";
import { AudioLoader } from "./transcribe-audio.mjs";

export const ingestData = async (collectionName, fileName, fileType) => {
  try {
    let loader;
    const filePath = `public/${fileType === "mp3" ? "audios" : "pdfs"
      }/${fileName}`;

    switch (fileType) {
      case "pdf":
        loader = new PDFLoader(filePath);
        break;
      case "srt":
        loader = new SRTLoader(filePath);
        break;
      case "epub":
        loader = new EPubLoader(filePath, { splitChapters: false });
        break;
      case "txt":
        loader = new TextLoader(filePath);
        break;
      case "docx":
        loader = new DocxLoader(filePath);
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
    await createVectorStore(docs, collectionName);
  } catch (err) {
    console.error("Ingestion failed", err);
    throw new Error(err.message);
  }
};
