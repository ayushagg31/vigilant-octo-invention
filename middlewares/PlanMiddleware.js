import { fetchPlanInfo } from "../services/firestore.service";

const PlanMiddleware = function (handler) {
  return async function (req, res) {
    try {
      // check which plan user is subscribed to
      const userEmail = req?.context?.user?.email;

      if (!userEmail) {
        return res.status(400).json({ message: "Missing required data" });
      }

      const planInfo = await fetchPlanInfo({
        userEmail: userEmail,
      });
      req.headers["X-Plan-Type"] = planInfo; // server side
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
