import { createCheckoutSession } from "../../services/stripe.service";
import AuthorizeMiddleware from "../../middlewares/AuthorizeMiddleware";
import { get } from "lodash"
import { plans } from "../../config/plan.config";
import logger from "../../services/logging.service";

const getPriceIdFromPlanId = (planId, timeZone) => {
  let currentTimeZone = timeZone;
  let currentPlan = get(plans, [planId, 'pricing', currentTimeZone, 'price_id']);
  return currentPlan;
}

export default AuthorizeMiddleware(async function handler(req, res) {
  const { planId, timeZone } = req.body;
  const userEmail = req?.context?.user?.email;

  // only accept post requests
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!planId || !userEmail || !timeZone) {
    return res.status(400).json({ message: "You are missing a required data" });
  }
  try {
    let priceId = getPriceIdFromPlanId(planId, timeZone);
    const session = await createCheckoutSession({ userEmail, priceId });
    res.status(200).send({ url: session.url });
  } catch (error) {
    logger.error(
      `/api/create-checkout-session error for userEmail:${userEmail}: ${error}`
    );
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
});
