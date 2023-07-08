import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { createVectorStore } from "../utils/pinecone.config.js";
import { SRTLoader } from "langchain/document_loaders/fs/srt";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";

export const ingestData = async (fileName, fileType, csvColumn) => {
  let loader;
  const filePath = `docs/${fileName}`;

  // TODO: need to test all types of loader other than pdf
  switch (fileType) {
    case "pdf":
      loader = new PDFLoader(filePath);
      break;
    case "json":
      // handle scenario when user wants to handle particular attrs
      loader = new JSONLoader(filePath);
      break;
    case "srt":
      loader = new SRTLoader(filePath);
      break;
    case "txt":
      loader = new TextLoader(filePath);
      break;
    case "csv":
      // handle scenario when csvColumn not specified
      loader = new CSVLoader(filePath, csvColumn);
      break;
    case "docx":
      loader = new DocxLoader(filePath);
      break;
    case "url":
      loader = new CheerioWebBaseLoader(fileName);
      break;
    default: {
      console.log(`${fileType} - not supported !!!`);
      throw new Error(`${fileType} - not supported !!!`);
    }
  }

  const rawText = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  // split text into chunks
  const docs = await textSplitter.splitDocuments(rawText);

  // create and store the embeddings in the vectorStore
  await createVectorStore(docs, fileName); // this shit cost money, use frugally
};

// (async () => {
//   await run();
//   console.log("Ingestion complete");
// })();
