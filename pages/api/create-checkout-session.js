import { createCheckoutSession } from "../../services/stripe.service";

export default async function handler(req, res) {
  const { userEmail, priceId } = req.body;
  //   const userEmail = req?.context?.user.email; ?

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
    console.log("error", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}
