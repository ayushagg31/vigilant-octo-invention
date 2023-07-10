import { Chroma } from "langchain/vectorstores/chroma";
import { embeddings } from "./openai.config";

export const createVectorStore = async (docs, collectionName) => {
  try {
    const chromaConfig = {
      url: process.env.CHROMA_URL,
      collectionName,
    };
    // Create vector store and index the docs
    await Chroma.fromDocuments(docs, embeddings, chromaConfig);
    console.log("Chroma Collection created successfully");
  } catch (error) {
    console.log("Error creating Chroma Collection:", error);
    throw new Error("Failed to create Chroma Collection");
  }
};

export const fetchVectorStore = async (collectionName) => {
  try {
    const chromaConfig = {
      url: process.env.CHROMA_URL,
      collectionName,
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
