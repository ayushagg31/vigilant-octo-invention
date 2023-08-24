import { fetchCollections } from "../../config/firestore.config";

export default async function handler(req, res) {
  const userId = req.headers["userid"];

  //only accept post requests
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!userId) {
    return res.status(400).json({ message: "Missing required data" });
  }
  try {
    const collections = await fetchCollections(userId);
    res.status(200).json({ collections });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}
