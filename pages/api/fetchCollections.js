import { fetchCollections } from "../../services/firestore.service";
import { AuthorizeHandler } from "../../middlewares/AuthMiddleware.ts";

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
    const collections = await fetchCollections(userEmail);
    res.status(200).json({ collections });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}

export default AuthorizeHandler(handler);
