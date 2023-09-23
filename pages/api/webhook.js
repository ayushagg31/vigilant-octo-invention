// api/webhook

import { buffer } from "micro";
import crypto from "crypto";
import logger from "../../services/logging.service";
import { subscriptionsHandler } from "../../services/subscriptions.service";

export const verifySignature = (rawBody, signature, secret) => {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
  const receivedSignature = Buffer.from(signature, "utf8");

  return crypto.timingSafeEqual(digest, receivedSignature);
};

export default async function handler(req, res) {
  // only accept post requests
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const rawBody = await buffer(req);
    const signature = req.headers["x-signature"] || "";
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || "";

    if (!verifySignature(rawBody, signature, secret)) {
      logger.error("Invalid Signature");
      res.status(400).send(`Invalid Signature`);
    }

    const payload = JSON.parse(rawBody.toString());

    const {
      meta: { event_name: eventName, custom_data: customData },
      data,
    } = payload;
    await subscriptionsHandler(eventName, customData, data);
  } catch (err) {
    logger.error(`Webhook Error:  ${err}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  res.status(200).end();
}

// EXPORT config to tell Next.js NOT to parse the body
export const config = {
  api: {
    bodyParser: false,
  },
};
