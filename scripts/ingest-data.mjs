import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { createVectorStore } from "../config/qdrant.config.js";
import { SRTLoader } from "langchain/document_loaders/fs/srt";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { HNLoader } from "langchain/document_loaders/web/hn";
import { IMSDBLoader } from "langchain/document_loaders/web/imsdb";
import { GitbookLoader } from "langchain/document_loaders/web/gitbook";
import { EPubLoader } from "langchain/document_loaders/fs/epub";
import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";

export const ingestData = async (collectionName, fileName, fileType) => {
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
      case "epub":
        loader = new EPubLoader(filePath, { splitChapters: false });
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
      case "hn": // Hackernews
        loader = new HNLoader(fileName);
        break;
      case "imsdb": // IMSDB
        loader = new IMSDBLoader(fileName);
        break;
      case "gitbook": // gitbook
        loader = new GitbookLoader(fileName);
        break;
      case "web": // web
        loader = new PuppeteerWebBaseLoader(fileName);
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
    console.log(docs);
    // this shit cost money, use frugally
    // await createVectorStore(docs, collectionName);
  } catch (err) {
    console.error("Ingestion failed", err);
    throw new Error(err.message);
  }
};
