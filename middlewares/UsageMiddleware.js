import { isToday } from "../utils";
import { fetchCollections } from "../services/firestore.service";
import { plans } from "../config/plan.config";
/************************************************
TODO: PDF/Video Size Limit, PDF Pages Limit, PDF Count Limit, Video Count Limit
Computation should be done on a per-day basis until the subscription expires.
************************************************/

// Temporary Plan:
// - 100 pages per document (max 15MB) => implement in /upload, /download (usageMiddleware)
// - Max upload size: 15MB => implement in /upload, /download (usageMiddleware)
// - 50 questions per day => implement in /chat API call (usageMiddleware)
// - 1 document per day => implement in /upload, /download (usageMiddleware)
// - Max video size: 15MB => implement in /ytTranscribe (usageMiddleware)
// - 1 video per day => implement in /ytTranscribe (usageMiddleware)

const UsageMiddleware = function (handler) {
  return async function (req, res) {
    try {
      const userEmail = req?.context?.user?.email;
      const file = req?.file;
      const { pdfUrl = "", ytUrl = "" } = req?.body || {};

      if (!userEmail) {
        return res.status(400).json({ message: "Missing required data" });
      }

      const currentPlan = plans[req.headers["X-Plan-Type"]];
      const { MAX_DOCUMENT_LIMIT } = currentPlan;

      const fileType = ytUrl
        ? "mp3"
        : pdfUrl
        ? "pdf"
        : file?.originalname?.split(".")?.pop();

      if (!MAX_DOCUMENT_LIMIT[fileType]) {
        return res.status(400).json({
          error: "Filetype not supported yet",
        });
      }

      // check for total pdf collection uploaded today
      // if count matches/exceed MAX_DOCUMENT_PER_DAY then rejects it
      const { collections } = await fetchCollections(userEmail);
      const collectionsCreatedToday = collections.filter((col) =>
        isToday(col.createdAt)
      );

      const fileTypeCounts = {};
      collectionsCreatedToday.forEach((col) => {
        const fileType = col.fileType;
        if (fileTypeCounts[fileType]) {
          fileTypeCounts[fileType]++;
        } else {
          fileTypeCounts[fileType] = 1;
        }
      });

      if (fileTypeCounts[fileType] >= MAX_DOCUMENT_LIMIT[fileType]) {
        return res.status(400).json({
          error: "Subscription Limit Exceeded",
        });
      }
    } catch (error) {
      console.error(`usageMiddleware error: ${error}`);
      return res
        .status(500)
        .json({ message: `Error while verifying usage. Error: ${error}` });
    }
    // pass back to handler
    return handler(req, res);
  };
};

export default UsageMiddleware;
