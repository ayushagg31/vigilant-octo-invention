import { fetchPlanInfo } from "../services/firestore.service";

const PlanMiddleware = function (handler) {
  return async function (req, res) {
    try {
      const { userEmail } = req.body;
      // check which plan user is subscribed to
      console.log("userEmail", userEmail);
      const planInfo = await fetchPlanInfo({
        userEmail: userEmail || "agg.ayush.1997@gmail.com",
      });
      req.headers["X-Plan-Type"] = planInfo;
    } catch (error) {
      console.error(`PlanMiddleware error: ${error}`);
      return res
        .status(500)
        .json({ message: `Error while checking the plans. Error: ${error}` });
    }
    return handler(req, res);
  };
};

export default PlanMiddleware;
