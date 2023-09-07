import { fetchVectorStore } from "../../config/qdrant.config";
import { ask } from "../../scripts/ask-query.mjs";
import { HumanChatMessage, AIChatMessage } from "langchain/schema";
import { fetchQueryInfo, updateUser } from "../../services/firestore.service";
import { isToday } from "../../utils";
import PlanMiddleware from "../../middlewares/PlanMiddleware";
import { plans } from "../../config/plan.config";

export default PlanMiddleware(async function handler(req, res) {
  const {
    question,
    history,
    collectionId,
    userEmail = "agg.ayush.1997@gmail.com",
  } = req.body;

  const currentPlan = plans[req.headers["X-Plan-Type"]];
  const { MAX_QUESTIONS_PER_DAY } = currentPlan;

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

  // if lastUpdatedAt is today, just increase by 1 and update lastUpdatedAt timestamp
  // if lastUpdatedAt is not today, just set the count to 1 and update lastUpdatedAt timestamp
  const { count, lastUpdatedAt } = await fetchQueryInfo({ userEmail });
  const isLastUpdatedToday = isToday(lastUpdatedAt);
  if (isLastUpdatedToday && count >= MAX_QUESTIONS_PER_DAY) {
    return res.status(400).json({
      error: "Max limit exceeds for the day",
    });
  }
  await updateUser({
    userEmail,
    queryInfo: {
      count: isLastUpdatedToday ? count + 1 : 1,
      lastUpdatedAt: Date.now(),
    },
  });

  // OpenAI recommends replacing newlines with spaces for best results
  const sanitizedQuestion = question.trim().replaceAll("\n", " ");

  try {
    const vectorStore = await fetchVectorStore(collectionId);

    // query
    const response = await ask(vectorStore, sanitizedQuestion, histories);
    res.status(200).json({ message: response.text });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
});
