import { fetchVectorStore } from "../../config/qdrant.config";
import { ask } from "../../scripts/ask-query.mjs";
import { HumanChatMessage, AIChatMessage } from "langchain/schema";

export default async function handler(req, res) {
  const { question, history, collectionName } = req.body;

  // resolve TypeError:chatMessage._getType is not a function
  const histories = history.map((hist) => {
    if (hist["type"] === "human") {
      return new HumanChatMessage(question);
    } else if (hist["type"] === "ai") {
      return new AIChatMessage(question);
    }
  });

  //only accept post requests
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!question) {
    return res.status(400).json({ message: "No question in the request" });
  }
  // OpenAI recommends replacing newlines with spaces for best results
  const sanitizedQuestion = question.trim().replaceAll("\n", " ");

  try {
    const vectorStore = await fetchVectorStore(collectionName);

    // query
    const response = await ask(vectorStore, sanitizedQuestion, histories);
    res.status(200).json({ message: response.text });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}
