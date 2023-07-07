import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { createVectorStore } from "../utils/pinecone.config.js";

export const ingestData = async (fileName = "notes.pdf") => {
  const loader = new PDFLoader(`docs/${fileName}`);

  const rawText = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  // split text into chunks
  const docs = await textSplitter.splitDocuments(rawText);

  fileName = `${fileName}_${Date.now()}`;

  // create and store the embeddings in the vectorStore
  await createVectorStore(docs, fileName);
};

// (async () => {
//   await run();
//   console.log("Ingestion complete");
// })();
