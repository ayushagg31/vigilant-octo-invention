import stripe from "stripe";
import { updateUser } from "./firestore.service";

var client = stripe(process.env.STRIPE_SERVICE_KEY);

// TODO: setup success and failure urls
// setup pricing page and pricing amounts/models

export const createCheckoutSession = async ({ priceId, userEmail }) => {
  const session = await client.checkout.sessions.create({
    mode: "subscription",
    customer_email: userEmail || "example@example.com",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000",
    //   "https://example.com/success.html?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "https://example.com/canceled.html",
  });
  return session;
};

export const handleWebhookEvents = async (event) => {
  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      {
        const paymentIntentSucceeded = event.data.object;

        const customerId = paymentIntentSucceeded.customer;
        const invoiceId = paymentIntentSucceeded.invoice;

        // Retrieve the Customer Info to access customer_email
        const customerInfo = await client.customers.retrieve(customerId);

        // Retrieve the Invoice to access the subscription
        const invoice = await client.invoices.retrieve(invoiceId);
        const subscriptionId = invoice.subscription;

        // Retrieve the Subscription to access the price ID
        const subscription = await client.subscriptions.retrieve(
          subscriptionId
        );
        const priceId = subscription.items.data[0].price.id;

        await updateUser({
          userEmail: customerInfo.email,
          paymentIntent: {
            id: paymentIntentSucceeded.id,
            priceId,
            status: paymentIntentSucceeded.status,
          },
        });
      }
      break;

    case "customer.subscription.deleted":
      {
        const customerSubscriptionDeleted = event.data.object;
        const customerId = customerSubscriptionDeleted.customer;
        const priceId = customerSubscriptionDeleted.plan.id;
        // Retrieve the Customer Info to access customer_email
        const customerInfo = await client.customers.retrieve(customerId);

        await updateUser({
          userEmail: customerInfo.email,
          paymentIntent: {
            id: customerSubscriptionDeleted.id,
            priceId,
            status: customerSubscriptionDeleted.status,
          },
        });
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }
};
