// /api/verifyCollection
import { verifyCollection } from "../../services/firestore.service";
import AuthorizeMiddleware from "../../middlewares/AuthorizeMiddleware";
import logger from "../../services/logging.service";

async function handler(req, res) {
  const { collectionId } = req.body;

  const userEmail = req?.context?.user?.email;

  // only accept post requests
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!collectionId || !userEmail) {
    return res.status(400).json({ message: "Missing required data" });
  }
  try {
    const { isVerified } = await verifyCollection({ collectionId, userEmail });
    res.status(200).send({ isVerified });
  } catch (error) {
    logger.error("/api/verifyCollection", userEmail, error);
    res.status(500).json({ error: error.message || "Something went wrong, Please try again later" });
  }
}

export default AuthorizeMiddleware(handler);
