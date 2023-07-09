import { Chroma } from "langchain/vectorstores/chroma";
import { embeddings } from "./openai.config";

const documents = [
  {
    pageContent: `Tortoise: Labyrinth? Labyrinth? Could it Are we in the notorious Little
      Harmonic Labyrinth of the dreaded Majotaur?`,
    metadata: {
      speaker: "Tortoise",
    },
  },
  {
    pageContent: "Achilles: Yiikes! What is that?",
    metadata: {
      speaker: "Achilles",
    },
  },
  {
    pageContent: `Tortoise: They say-although I person never believed it myself-that an I
      Majotaur has created a tiny labyrinth sits in a pit in the middle of
      it, waiting innocent victims to get lost in its fears complexity.
      Then, when they wander and dazed into the center, he laughs and
      laughs at them-so hard, that he laughs them to death!`,
    metadata: {
      speaker: "Tortoise",
    },
  },
  {
    pageContent: "Achilles: Oh, no!",
    metadata: {
      speaker: "Achilles",
    },
  },
  {
    pageContent: "Tortoise: But it's only a myth. Courage, Achilles.",
    metadata: {
      speaker: "Tortoise",
    },
  },
];

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
