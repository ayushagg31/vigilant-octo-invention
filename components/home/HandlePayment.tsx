import { Container, Box, Wrap, WrapItem, Text, Center } from "@chakra-ui/react";
import { createCheckoutSessionApi } from "../../services/client.service";

const HandlePayment = () => {
  const handlePayment = async () => {
    try {
      // https://stripe.com/docs/testing
      // https://stripe.com/docs/india-recurring-payments?integration=paymentIntents-setupIntents#testing
      const { data } = await createCheckoutSessionApi({
        priceId: "price_1NjmwMSHPnNdGnAZe9guNYlQ",
      });
      console.log(data.url);
      window.location.href = data.url;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw new Error("Failed to create user", e.message);
    }
  };
  return (
    <Box p={2} style={{ border: "1px solid red", background: "pink" }}>
      <button onClick={handlePayment}> Pay here...</button>
    </Box>
  );
};

export default HandlePayment;
