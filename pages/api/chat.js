import { fetchVectorStore } from "../../utils/pinecone.config";
import { ask } from "../../scripts/ask-query.mjs";

export default async function handler(req, res) {
  const { question, history, fileName } = req.body;

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
    const vectorStore = await fetchVectorStore(fileName);

    // query
    const response = await ask(vectorStore, sanitizedQuestion, history);
    res.status(200).json({ message: response.text });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}
