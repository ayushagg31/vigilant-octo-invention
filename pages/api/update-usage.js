// @ts-check
import AuthorizeMiddleware from "../../middlewares/AuthorizeMiddleware";
import { fetchUsageInfo, updateUser } from "../../services/firestore.service";
import { isToday, isBefore30Days } from "../../utils";
import logger from "../../services/logging.service";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req?.context?.user?.email;
    const {
      query: { count: queryCount, lastUpdatedAt: queryLastUpdatedAt },
      mp3: { count: mp3Count, lastUpdatedAt: mp3LastUpdatedAt },
      pdf: { count: pdfCount, lastUpdatedAt: pdfLastUpdatedAt },
    } = await fetchUsageInfo({ userEmail });

    // any of the lastUpdatedAt for query is not today, reset counter
    // any of the lastUpdatedAt for mp3 and pdf is not last 30 days, reset counter
    const isQueryLastUpdatedToday = isToday(queryLastUpdatedAt);
    const isMp3LastUpdatedBefore30Days = isBefore30Days(mp3LastUpdatedAt);
    const isPdfLastUpdatedBefore30Days = isBefore30Days(pdfLastUpdatedAt);
    if (
      !isQueryLastUpdatedToday ||
      !isMp3LastUpdatedBefore30Days ||
      !isPdfLastUpdatedBefore30Days
    ) {
      try {
        await updateUser({
          userEmail,
          usageInfo: {
            query: {
              count: isQueryLastUpdatedToday ? queryCount : 0,
              lastUpdatedAt: isQueryLastUpdatedToday
                ? isQueryLastUpdatedToday
                : Date.now(),
            },
            pdf: {
              count: isPdfLastUpdatedBefore30Days ? pdfCount : 0,
              lastUpdatedAt: isPdfLastUpdatedBefore30Days
                ? isPdfLastUpdatedBefore30Days
                : Date.now(),
            },
            mp3: {
              count: isMp3LastUpdatedBefore30Days ? mp3Count : 0,
              lastUpdatedAt: isMp3LastUpdatedBefore30Days
                ? isMp3LastUpdatedBefore30Days
                : Date.now(),
            },
          },
        });
      } catch (error) {
        logger.error(`/api/update-usage for userEmail: ${userEmail}: ${error}`);
        res
          .status(500)
          .json({ error: "Failed to respond, Please try again later." });
      }
    }
    res.status(200).json({ message: "Updated Successfully" });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

export default AuthorizeMiddleware(handler);
