import { fetchVectorStore } from "../../config/qdrant.config";
import { ask } from "../../scripts/ask-query.mjs";
import { fetchUsageInfo, updateUser } from "../../services/firestore.service";
import { isToday } from "../../utils";
import PlanMiddleware from "../../middlewares/PlanMiddleware";
import { PLUS_TIER } from "../../constants/plan.constants";
import { plans } from "../../config/plan.config";
import AuthorizeMiddleware from "../../middlewares/AuthorizeMiddleware";
import logger from "../../services/logging.service";
import getErrorMsg from "../../constants/error.constants";

export default AuthorizeMiddleware(
  PlanMiddleware(async function handler(req, res) {
    const { question, history, collectionId } = req.body;
    const userEmail = req?.context?.user?.email;

    if (!userEmail) {
      return res.status(400).json({ message: "Missing required data" });
    }
    try {
      const planType = req.headers["X-Plan-Type"];
      const currentPlan = plans[planType];
      const { MAX_QUESTIONS_PER_DAY } = currentPlan;

      //only accept post requests
      if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
      }

      if (!question) {
        return res.status(400).json({
          message:
            "I need a question to answer. Can you please ask your question again?",
        });
      }

      // if lastUpdatedAt is today, just increase by 1 and update lastUpdatedAt timestamp
      // if lastUpdatedAt is not today, just set the count to 1 and update lastUpdatedAt timestamp
      const usageInfo = await fetchUsageInfo({ userEmail });
      const { count, lastUpdatedAt } = usageInfo.query;
      const isLastUpdatedToday = isToday(lastUpdatedAt);
      if (isLastUpdatedToday && count >= MAX_QUESTIONS_PER_DAY) {
        return res.status(400).json({
          error: getErrorMsg(
            planType === PLUS_TIER ? "DAILY_LIMIT_PRO" : "DAILY_LIMIT"
          ),
        });
      }
      await updateUser({
        userEmail,
        usageInfo: {
          ...usageInfo,
          query: {
            count: isLastUpdatedToday ? count + 1 : 1,
            lastUpdatedAt: Date.now(),
          },
        },
      });

      // OpenAI recommends replacing newlines with spaces for best results
      const sanitizedQuestion = question.trim().replaceAll("\n", " ");

      const vectorStore = await fetchVectorStore(collectionId);
      // query
      const response = await ask(vectorStore, sanitizedQuestion, history);
      res.status(200).json({ message: response.text });
    } catch (error) {
      logger.error(`/api/chat for userEmail: ${userEmail}: ${error}`);
      res
        .status(500)
        .json({ error: "Failed to respond, Please try again later." });
    }
  })
);
