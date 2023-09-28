import { fetchPlanInfo } from "../services/firestore.service";
import logger from "../services/logging.service";

const PlanMiddleware = function (handler) {
  return async function (req, res) {
    const userEmail = req?.context?.user?.email;

    if (!userEmail) {
      return res.status(400).json({ message: "Missing required data" });
    }
    try {
      // check which plan user is subscribed to
      const planInfo = await fetchPlanInfo({
        userEmail: userEmail,
      });
      req.headers["X-Plan-Type"] = planInfo; // server side
    } catch (error) {
      logger.error(
        `PlanMiddleware error for userEmail: ${userEmail}: ${error}`
      );
      return res
        .status(500)
        .json({ message: `Failed to verify plans.` });
    }
    return handler(req, res);
  };
};

export default PlanMiddleware;
