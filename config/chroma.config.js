import { Chroma } from "langchain/vectorstores/chroma";
import { embeddings } from "./openai.config";

export const createVectorStore = async (docs, collectionId) => {
  try {
    const chromaConfig = {
      url: process.env.CHROMA_URL,
      collectionName: collectionId,
    };
    // Create vector store and index the docs
    await Chroma.fromDocuments(docs, embeddings, chromaConfig);
    console.log("Chroma Collection created successfully");
  } catch (error) {
    console.log("Error creating Chroma Collection:", error);
    throw new Error("Failed to create Chroma Collection");
  }
};

export const fetchVectorStore = async (collectionId) => {
  try {
    const chromaConfig = {
      url: process.env.CHROMA_URL,
      collectionName: collectionId,
    };

    const vectorStore = await Chroma.fromExistingCollection(
      embeddings,
      chromaConfig
    );
    return vectorStore;
  } catch (error) {
    console.log("Error fetching Chroma Collection:", error);
    throw new Error("Failed to fetch Chroma Collection");
  }
};
