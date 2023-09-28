import { Box, Flex, Stat, StatLabel, Button, Text } from "@chakra-ui/react";
import { useCollections } from "../../store/useCollections";
import { AiFillCheckCircle } from "react-icons/ai";
import { PLUS_TIER, FREE_TIER } from "../../constants/plan.constants";
import { createCheckoutSessionApi } from "../../services/client.service";
import isUrl from "is-url";
import LemonLoader from "../landing/LemonLoader";

export const StatsCard = (props) => {
  const { currentPlan } = useCollections();
  const { cardType, plans } = props;
  const pricing = plans[cardType];
  const processPayment = async () => {
    try {
      const { data } = await createCheckoutSessionApi({
        planId: cardType,
      });
      const checkoutUrl = data.url;
      if (isUrl(checkoutUrl)) {
        if (window.LemonSqueezy) window.LemonSqueezy.Url.Open(checkoutUrl);
        else window.location.href = checkoutUrl;
      } else {
        addError("Error in processing subscription ");
        setLoader(false);
      }
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <LemonLoader />
      <Stat
        px={{ base: 2, md: 4 }}
        py={"5"}
        shadow={"xl"}
        border={"2px solid"}
        borderColor={`${currentPlan === cardType ? "#3a674f" : ""}`}
        rounded={"lg"}
      >
        <Box>
          <Flex justify="space-between">
            <StatLabel fontWeight={"medium"} fontSize="lg" mb="2" isTruncated>
              {pricing.planName}
            </StatLabel>
            {currentPlan === cardType && (
              <AiFillCheckCircle color="#37A169" fontSize={"28px"} />
            )}
          </Flex>
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize={"2xl"} fontWeight={"medium"}>
              {pricing.primaryText}
            </Text>
            {currentPlan === FREE_TIER && cardType === PLUS_TIER && (
              <Button
                colorScheme="blue"
                onClick={() => processPayment()}
                size={{ base: "xs", sm: "md" }}
              >
                Upgrade to pro
              </Button>
            )}
          </Flex>
        </Box>
      </Stat>
    </>
  );
};
