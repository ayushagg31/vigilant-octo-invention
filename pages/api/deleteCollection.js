import { deleteCollection } from "../../services/firestore.service";
import AuthorizeMiddleware from "../../middlewares/AuthorizeMiddleware";
import logger from "../../services/logging.service";

export default AuthorizeMiddleware(async function handler(req, res) {
  const { collectionId } = req.body;
  const userEmail = req?.context?.user.email;

  // only accept delete requests
  if (req.method !== "DELETE") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!collectionId || !userEmail) {
    return res.status(400).json({ message: "Missing required data" });
  }
  try {
    const { activeCollections } = await deleteCollection({
      collectionId,
      userEmail,
    });
    res.status(200).send({ collections: activeCollections });
  } catch (error) {
    logger.error("/api/deleteCollection", userEmail, collectionId, error);
    res.status(500).json({ error: "Failed to delete collection" });
  }
});
