import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { createVectorStore } from "../utils/pinecone.config.js";
import { SRTLoader } from "langchain/document_loaders/fs/srt";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";

export const ingestData = async (fileName, fileType) => {
  try {
    let loader;
    const filePath = `docs/${fileName}`;

    // TODO: need to test all types of loader other than pdf
    switch (fileType) {
      case "pdf":
        loader = new PDFLoader(filePath);
        break;
      case "json":
        // Ask user to modify document with necessary info
        loader = new JSONLoader(filePath);
        break;
      case "srt":
        loader = new SRTLoader(filePath);
        break;
      case "txt":
        loader = new TextLoader(filePath);
        break;
      case "csv":
        // Ask user to modify document with necessary info
        loader = new CSVLoader(filePath);
        break;
      case "docx":
        loader = new DocxLoader(filePath);
        break;
      case "url":
        loader = new CheerioWebBaseLoader(fileName);
        break;
      default: {
        console.error(`${fileType} not supported`);
        throw new Error(`${fileType} not supported`);
      }
    }

    const rawText = await loader.load();
    console.log(rawText, filePath);
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    // split text into chunks
    const docs = await textSplitter.splitDocuments(rawText);

    // this shit cost money, use frugally
    // await createVectorStore(docs, fileName);
  } catch (err) {
    console.error("Ingestion failed", err);
    throw new Error(err.message);
  }
};
