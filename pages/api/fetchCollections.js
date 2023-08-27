import { fetchCollections } from "../../utils/firestore.utils";
import { AuthorizeHandler } from "../../middlewares/AuthMiddleware.ts"
async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  let userId = req?.context?.user.user_id;
  if (userId == undefined) {
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


export default AuthorizeHandler(handler);