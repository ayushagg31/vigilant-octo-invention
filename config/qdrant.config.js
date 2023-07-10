import { QdrantVectorStore } from "langchain/vectorstores/qdrant";
import { embeddings } from "./openai.config.js";
import "dotenv/config";

export const createVectorStore = async (docs, collectionName) => {
  try {
    // embed the PDF documents
    await QdrantVectorStore.fromDocuments(docs, embeddings, {
      url: process.env.QDRANT_URL,
      collectionName: collectionName,
    });
    console.log("Qdrant Collection created successfully");
  } catch (error) {
    console.log("Error creating Qdrant Collection:", error);
    throw new Error("Failed to create Qdrant Collection");
  }
};

export const fetchVectorStore = async (collectionName) => {
  try {
    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        url: process.env.QDRANT_URL,
        collectionName: collectionName,
      }
    );
    return vectorStore;
  } catch (error) {
    console.log("Error fetching Qdrant Collection:", error);
    throw new Error("Failed to fetch Qdrant Collection");
  }
};
