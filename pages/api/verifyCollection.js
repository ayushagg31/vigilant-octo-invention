import { verifyCollection } from "../../services/firestore.service";
import AuthorizeMiddleware from "../../middlewares/AuthorizeMiddleware";

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
    console.log("error", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}

export default AuthorizeMiddleware(handler);
