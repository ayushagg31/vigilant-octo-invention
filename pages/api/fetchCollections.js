import { fetchCollections } from "../../services/firestore.service";
import AuthorizeMiddleware from "../../middlewares/AuthorizeMiddleware";

async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  let userEmail = req?.context?.user.email;
  if (!userEmail) {
    return res.status(400).json({ message: "Missing required data" });
  }

  try {
    const { activeCollections, currentPlan, queryInfo } =
      await fetchCollections(userEmail);
    res
      .status(200)
      .json({ collections: activeCollections, currentPlan, queryInfo });
  } catch (error) {
    logger.error(`/api/fetchCollections - userEmail:${userEmail}`, err);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}

export default AuthorizeMiddleware(handler);
