import { isBefore30Days } from "../utils";
import { fetchUsageInfo } from "../services/firestore.service";
import { plans } from "../config/plan.config";
import logger from "../services/logging.service";

/************************************************
TODO: PDF/Video Size Limit, PDF Pages Limit, PDF Count Limit, Video Count Limit
Computation should be done on a per-day basis until the subscription expires.
************************************************/

const UsageMiddleware = function (handler) {
  return async function (req, res) {
    const userEmail = req?.context?.user?.email;
    const file = req?.file;
    const { pdfUrl = "", ytUrl = "" } = req?.body || {};

    if (!userEmail) {
      return res.status(400).json({ message: "Missing required data" });
    }
    try {
      const currentPlan = plans[req.headers["X-Plan-Type"]];
      const { MAX_DOCUMENT_LIMIT } = currentPlan;
      const fileType = ytUrl
        ? "mp3"
        : pdfUrl
        ? "pdf"
        : file?.originalname?.split(".")?.pop();

      if (MAX_DOCUMENT_LIMIT[fileType] !== 0 && !MAX_DOCUMENT_LIMIT[fileType]) {
        logger.info(
          `Filetype not supported yet. fileType: ${fileType} Originalname: ${file?.originalname} ${userEmail}`
        );
        return res.status(400).json({
          error:
            "Filetype not supported yet. If you would like us to support this file type in the future, consider raising a request.",
          userEmail,
        });
      }

      // check for total pdf collection uploaded today
      // if count matches/exceed MAX_DOCUMENT_PER_DAY then rejects it
      const usageInfo = await fetchUsageInfo({ userEmail });
      const { count, lastUpdatedAt } = usageInfo[fileType];
      if (isBefore30Days(lastUpdatedAt) && count >= MAX_DOCUMENT_LIMIT[fileType]) {
        return res.status(400).json({
          error: "You've exhausted your monthly limit",
        });
      }
    } catch (error) {
      logger.error(
        `UsageMiddleware error for userEmail:${userEmail}: ${error}`
      );
      return res
        .status(500)
        .json({ message: `Error while verifying usage. Error: ${error}` });
    }
    // pass back to handler
    return handler(req, res);
  };
};

export default UsageMiddleware;
