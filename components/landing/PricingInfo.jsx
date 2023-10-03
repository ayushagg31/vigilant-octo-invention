"use client";

import {
  Box,
  Stack,
  HStack,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { pricingPlanConfig } from "../../config/pricing.plan";
import { AiFillCheckCircle } from "react-icons/ai";
import { createCheckoutSessionApi } from "../../services/client.service";
import { useAuth } from "../../store/useAuth";
import { LoginModal } from "../home/LoginModal";
// @ts-ignore
import { useState } from "react";
import { useAPIError } from "../../hooks/useApiHook";
import { useCollections } from "../../store/useCollections";
import LemonLoader from "./LemonLoader";
// @ts-ignore
import isUrl from "is-url";
import {useEffect} from 'react'
import { getAnalytics, logEvent } from "firebase/analytics";
import { app } from "../../config/googleAuth.config";
import { SUBSCRIPTION_CLICK_ANON, SUBSCRIPTION_CLICK_USER } from "../../constants/analytics.constants";

let analytics;
export default function PricingInfo() {
  const [loader, setLoader] = useState(false);
  const { addError } = useAPIError();
  const { currentPlan } = useCollections();

  const {
    isOpen: isOpenLoginModal,
    onOpen: onOpenLoginModal,
    onClose: onCloseLoginModal,
  } = useDisclosure();

  useEffect(() => {
    analytics = getAnalytics(app);
  }, []);

  const { user } = useAuth((store) => ({
    user: store.user,
  }));

  const processPayment = async (planId) => {
    try {
      const { data } = await createCheckoutSessionApi({
        planId,
      });
      const checkoutUrl = data.url;
      if (isUrl(checkoutUrl)) {
        // @ts-ignore
        if (window?.LemonSqueezy) window.LemonSqueezy.Url.Open(checkoutUrl);
        else window.location.href = checkoutUrl;
      } else {
        addError("Error in processing subscription ");
        setLoader(false);
      }
    } catch (e) {
      throw e;
    }
  };

  const HandlePaymentClick = async (planId) => {
    setLoader(true);
    if (user) {
      await processPayment(planId);
      addError(
        "Your payment is currently being processed. Please be sure to check your email for any pending actions, or consider refreshing your page for updates.", 'info'
      );
      logEvent(analytics, SUBSCRIPTION_CLICK_USER, { user: user?.email, name: user?.displayName });
      setLoader(false);
    } else {
      onOpenLoginModal();
      logEvent(analytics, SUBSCRIPTION_CLICK_ANON);
    }
  };

  function PricePlan({ plan }) {
    const { planName, priceDetails, features, planId, showPricingButton } =
      plan;
    const isActive = currentPlan === planId && user;
    return (
      <Flex
        flexDirection={"column"}
        shadow="base"
        borderWidth="1px"
        zIndex="1"
        alignSelf="stretch"
        borderColor={
          isActive ? "#37A169" : useColorModeValue("gray.200", "gray.500")
        }
        borderRadius={"xl"}
        bg={"#000"}
      >
        <Box py={{ base: "2", sm: "4" }} color={"white"}>
          <Flex justifyContent={"center"} gap="1rem" alignContent={"center"}>
            <Text fontWeight="500" fontSize={{ base: "l", sm: "2xl" }}>
              {planName}
            </Text>
            {isActive && (
              <AiFillCheckCircle
                style={{
                  margin: "auto 0",
                }}
                color="#37A169"
                fontSize={"1.5rem"}
              />
            )}
          </Flex>
          <HStack justifyContent="center">
            <Text fontSize={{ base: "xl", sm: "3xl" }} fontWeight="600">
              {priceDetails.currency}
            </Text>
            <Text fontSize={{ base: "2xl", sm: "5xl" }} fontWeight="900">
              {priceDetails.amount}
            </Text>
            <Text fontSize={{ base: "xl", sm: "3xl" }}>
              / {priceDetails.duration}
            </Text>
          </HStack>
        </Box>
        <VStack bg={"#171923"} py={4} borderBottomRadius={"xl"} h={"100%"}>
          <List
            color={"black"}
            spacing={3}
            textAlign="start"
            px={{ base: "3", sm: "12" }}
          >
            {features.map((feature, i) => (
              <ListItem
                key={i}
                color="#f2f2f2"
                fontSize={{ base: "lg", sm: "sm", md: "md" }}
              >
                <ListIcon
                  as={FaCheckCircle}
                  rounded={100}
                  color="#f2f2f2"
                  bg="black"
                />
                {feature}
              </ListItem>
            ))}
          </List>
          <Box w="80%" pt={7}>
            {showPricingButton && !isActive && (
              <Button
                w="full"
                isLoading={loader}
                rounded={100}
                colorScheme="black"
                variant="outline"
                onClick={() => HandlePaymentClick(planId)}
              >
                Subscribe
              </Button>
            )}
          </Box>
        </VStack>
      </Flex>
    );
  }

  return (
    <>
      <LemonLoader />
      <Stack
        flexDirection={{ base: "column", sm: "row" }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}
      >
        {pricingPlanConfig.map((plan, i) => (
          <PricePlan key={i} plan={plan} />
        ))}
      </Stack>
      <LoginModal
        isOpen={isOpenLoginModal}
        onOpen={onOpenLoginModal}
        onClose={() => {
          setLoader(false);
          onCloseLoginModal();
        }}
        fn={() => processPayment(pricingPlanConfig[1].planId)}
      />
    </>
  );
}
