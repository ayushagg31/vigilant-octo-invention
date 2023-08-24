import { QdrantVectorStore } from "langchain/vectorstores/qdrant";
import { embeddings } from "./openai.config.js";
import { QdrantClient } from "@qdrant/js-client-rest";
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
    console.log("Qdrant Collection created successfully");
  } catch (error) {
    console.log("Error creating Qdrant Collection:", error);
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
    console.log("Error fetching Qdrant Collection:", error);
    throw new Error("Failed to fetch Qdrant Collection");
  }
};

// need to verify
export async function removeCollection(collectionId) {
  try {
    const response = await client.deleteIndex(collectionId);
    console.log("Collection removed:", response);
  } catch (error) {
    console.error("Error removing collection:", error);
  }
}
