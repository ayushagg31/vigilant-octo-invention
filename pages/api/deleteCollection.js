import { deleteCollection } from  "../../services/firestore.service";
import { AuthorizeHandler } from "../../middlewares/AuthMiddleware.ts";

export default AuthorizeHandler(async function handler(req, res) {
  const { collectionId } = req.body;
  const userId = req?.context?.user.user_id;

  // only accept delete requests
  if (req.method !== "DELETE") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!collectionId || !userId) {
    return res.status(400).json({ message: "Missing required data" });
  }
  try {
    const collections = await deleteCollection({ collectionId, userId });
    res.status(200).send({ collections });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
});
