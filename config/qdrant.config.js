import { QdrantVectorStore } from "langchain/vectorstores/qdrant";
import { embeddings } from "./openai.config.js";
import "dotenv/config";

import { QdrantClient } from '@qdrant/js-client-rest';

const client = new QdrantClient({
  url: 'https://0244d58a-698c-43ba-8e1f-b25e3e3a527e.us-east-1-0.aws.cloud.qdrant.io:6333',
  apiKey: 'Z9tTsnkuc-ZAK8OCakvRe4jbAjC2yV-QqhMsyGKDSJ71qi8e5uRbng',
});

export const createVectorStore = async (docs, collectionName) => {
  try {
    // embed the PDF documents
    console.log(process.env.OPEN_AI_API_KEY, process.env.QDRANT_URL)
    await QdrantVectorStore.fromDocuments(docs, embeddings, {
      client,
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
        client,
        collectionName: collectionName,
      }
    );
    return vectorStore;
  } catch (error) {
    console.log("Error fetching Qdrant Collection:", error);
    throw new Error("Failed to fetch Qdrant Collection");
  }
};
