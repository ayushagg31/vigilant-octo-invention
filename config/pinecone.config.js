import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { embeddings } from "./openai.config.js";
import "dotenv/config";

async function initializePinecone() {
  try {
    const client = new PineconeClient();
    await client.init({
      environment: process.env.PINECONE_ENVIRONMENT,
      apiKey: process.env.PINECONE_API_KEY,
    });

    return client;
  } catch (error) {
    console.log("Error initializing Pinecone Client:", error);
    throw new Error("Failed to initialize Pinecone Client");
  }
}

export const createVectorStore = async (docs, namespace) => {
  try {
    const pinecone = await initializePinecone();
    const pineconeIndex = pinecone.Index(process.env.INDEX_NAME);

    //embed the PDF documents
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex,
      namespace: namespace || process.env.PINECONE_NAMESPACE,
      textKey: "text",
    });
  } catch (error) {
    console.log("Error creating Pinecone Store:", error);
    throw new Error("Failed to create Pinecone Store");
  }
};

export const fetchVectorStore = async (namespace) => {
  try {
    const pinecone = await initializePinecone();
    const pineconeIndex = pinecone.Index(process.env.INDEX_NAME);
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
      namespace: namespace || process.env.PINECONE_NAMESPACE,
      textKey: "text",
    });
    return vectorStore;
  } catch (error) {
    console.log("Error fetching Pinecone Store:", error);
    throw new Error("Failed to fetch Pinecone Store");
  }
};