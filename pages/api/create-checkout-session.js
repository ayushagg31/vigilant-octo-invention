import AuthorizeMiddleware from "../../middlewares/AuthorizeMiddleware";
import { get } from "lodash";
import { plans } from "../../config/plan.config";
import logger from "../../services/logging.service";

export default AuthorizeMiddleware(async function handler(req, res) {
  const { planId } = req.body;
  const { email: userEmail, name: userName } = req?.context?.user;

  // only accept post requests
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!planId || !userEmail) {
    return res.status(400).json({ message: "Server failed to verify request" });
  }
  try {
    const urlParams = new URLSearchParams();
    urlParams.append("checkout[email]", userEmail);
    urlParams.append("checkout[name]", userName || "");
    urlParams.append("checkout[custom][product]", planId); // plus_tier
    let checkoutUrl = get(plans, [planId, "pricing", "checkout_url"]);
    checkoutUrl = `${checkoutUrl}&${urlParams}`;
    res.status(200).send({ url: checkoutUrl });
  } catch (error) {
    logger.error(`/api/create-checkout-session error for ${error.message}`);
    res.status(500).json({ error: error.message || "Something went wrong, Please try again later" });
  }
});
