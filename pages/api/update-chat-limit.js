import AuthorizeMiddleware from "../../middlewares/AuthorizeMiddleware";
import { fetchQueryInfo } from "../../services/firestore.service";
import { isToday } from "../../utils";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req?.context?.user?.email;
    const { lastUpdatedAt } = await fetchQueryInfo({ userEmail });
    const isLastUpdatedToday = isToday(lastUpdatedAt);
    if (!isLastUpdatedToday) {
      try {
        await updateUser({
          userEmail,
          queryInfo: {
            count: 0,
            lastUpdatedAt: Date.now(),
          },
        });
        res.status(200).json({ message: "Updated" });
      } catch (error) {
        logger.error(
          `/api/update-chat-limit for userEmail: ${userEmail}: ${error}`
        );
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
