import { updateUser, fetchPlanInfo } from "./firestore.service";
import logger from "./logging.service";

export const subscriptionsHandler = async (eventName, customData, data) => {
  // Handle the event
  try {
    switch (eventName) {
      case "subscription_payment_success":
        {
          const {
            attributes: { user_email, customer_id, status },
          } = data;
          const product = customData.product; // plus_tier
          await updateUser({
            userEmail: user_email,
            currentPlan: product,
            paymentInfo: {
              customerId: customer_id,
              status, // paid
            },
            usageInfo: {
              query: {
                count: 0,
                lastUpdatedAt: Date.now(),
              },
              pdf: {
                count: 0,
                lastUpdatedAt: Date.now(),
              },
              mp3: {
                count: 0,
                lastUpdatedAt: Date.now(),
              },
            },
          });
        }
        break;

      case "subscription_updated":
        {
          const {
            attributes: { user_email, customer_id, status },
          } = data;
          let currentPlan = await fetchPlanInfo({ userEmail: user_email });
          // const product = customData.product; // plus_tier
          // const activeStatus = ["active", , "cancelled"];
          const inactiveStatus = ["unpaid", "past_due", "expired"];
          if (inactiveStatus.includes(status)) currentPlan = "free_tier";
          await updateUser({
            userEmail: user_email,
            currentPlan,
            paymentInfo: {
              customerId: customer_id,
              status,
            },
          });
        }
        break;

      default:
        console.log(`Unhandled event type ${eventName}`);
    }
  } catch (err) {
    logger.error(`subscriptionsHandler Error: ${err}`);
    throw new Error("subscriptionsHandler Failed");
  }
};
