import stripe from "stripe";

var client = stripe(
  "sk_test_51NjlGUSHPnNdGnAZ7ZxAKhLLNmj0C2Bi53wqx8LO7dCzSLI8Lf5xZ2GdpbhR24SDaVpFWXJouzY1j1EgUgviHDpg00Lbc6tqvj"
);

export const createCheckoutSession = async ({ userId, priceId }) => {
  const session = await client.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
    // the actual Session ID is returned in the query parameter when your customer
    // is redirected to the success page.
    success_url: "http://localhost:3000/",
    //   "https://example.com/success.html?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "https://example.com/canceled.html",
  });
  console.log("session", session.utl);
  return session;
};
