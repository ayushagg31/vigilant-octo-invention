import { QdrantVectorStore } from "langchain/vectorstores/qdrant";
import { embeddings } from "./openai.config.js";
import { QdrantClient } from "@qdrant/js-client-rest";
import logger from "../services/logging.service";
import "dotenv/config";

const client = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

export const createVectorStore = async (docs, collectionId) => {
  try {
    // embed the PDF documents
    await QdrantVectorStore.fromDocuments(docs, embeddings, {
      client,
      collectionName: collectionId,
    });
    logger.info(`Qdrant Collection created successfully ${collectionId}`);
  } catch (error) {
    logger.error(`Error creating Qdrant Collection: ${collectionId}`, error);
    throw new Error("Failed to create Qdrant Collection");
  }
};

export const fetchVectorStore = async (collectionId) => {
  try {
    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        client,
        collectionName: collectionId,
      }
    );
    return vectorStore;
  } catch (error) {
    logger.error(`Error fetching Qdrant Collection: ${collectionId}`, error);
    throw new Error("Failed to fetch Qdrant Collection");
  }
};

//TODO: need to verify
export async function removeCollection(collectionId) {
  try {
    const response = await client.deleteCollection(collectionId);
    logger.warn(`Collection removed: ${collectionId} ${response}`);
  } catch (error) {
    logger.error(`Error removing Qdrant Collection: ${collectionId}`, error);
  }
}
