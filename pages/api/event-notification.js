// api/event-notification

import stripe from "stripe";
import { buffer } from "micro";
import { handleWebhookEvents } from "../../services/stripe.service";

var client = stripe(process.env.STRIPE_SERVICE_KEY);

export default async function handler(req, res) {
  // only accept post requests
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const reqBuffer = await buffer(req);
  const payload = reqBuffer.toString();
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = client.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook Error:", err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  await handleWebhookEvents(event);
  res.status(200).end();
}

// EXPORT config to tell Next.js NOT to parse the body
export const config = {
  api: {
    bodyParser: false,
  },
};
