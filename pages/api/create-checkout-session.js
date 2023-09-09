import { createCheckoutSession } from "../../services/stripe.service";
import AuthorizeMiddleware from "../../middlewares/AuthorizeMiddleware";
import logger from "../../services/logging.service";

export default AuthorizeMiddleware(async function handler(req, res) {
  const { priceId } = req.body;
  const userEmail = req?.context?.user?.email;

  // only accept post requests
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!priceId || !userEmail) {
    return res.status(400).json({ message: "Missing required data" });
  }
  try {
    const session = await createCheckoutSession({ userEmail, priceId });
    res.status(200).send({ url: session.url });
  } catch (error) {
    logger.error(
      `/api/create-checkout-session error for userEmail:${userEmail}: ${error}`
    );
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
});
