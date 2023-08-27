import { verifyCollection } from "../../utils/firestore.utils"

export default async function handler(req, res) {
  const { collectionId, userId } = req.body;

  // only accept post requests
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!collectionId || !userId) {
    return res.status(400).json({ message: "Missing required data" });
  }
  try {
    const { isVerified } = await verifyCollection({ collectionId, userId });
    res.status(200).send({ isVerified });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}
