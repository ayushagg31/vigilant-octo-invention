import AuthorizeMiddleware from "../../middlewares/AuthorizeMiddleware";
import { fetchUsageInfo } from "../../services/firestore.service";
import { isToday } from "../../utils";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req?.context?.user?.email;
    const {
      query: { lastUpdatedAt: queryLastUpdatedAt },
    } = await fetchUsageInfo({ userEmail });

    // any of the lastUpdatedAt is not today, reset all counter
    const isQueryLastUpdatedToday = isToday(queryLastUpdatedAt);
    if (!isQueryLastUpdatedToday) {
      try {
        await updateUser({
          userEmail,
          usageInfo: {
            query: {
              count: 0,
              lastUpdatedAt: Date.now(),
            },
            pdf: {
              count: 0,
              lastUpdatedAt: Date.now(),
            },
            mp3: {
              count: 0,
              lastUpdatedAt: Date.now(),
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
