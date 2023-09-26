"use client";

import {
  Box,
  Stack,
  HStack,
  Heading,
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
import { createCheckoutSessionApi } from "../../services/client.service";
import { useAuth } from "../../store/useAuth";
import { LoginModal } from "../home/LoginModal";
import { useEffect, useRef, useState, useCallback } from "react";
import { useAPIError } from "../../hooks/useApiHook";
import LemonLoader from "./LemonLoader";
import isUrl from "is-url";

export default function ThreeTierPricing() {
  const [currentPlanId, setCurrentPlanId] = useState(null);
  const [loader, setLoader] = useState(false);
  const initialRun = useRef(false);
  const { addError } = useAPIError();
  const {
    isOpen: isOpenLoginModal,
    onOpen: onOpenLoginModal,
    onClose: onCloseLoginModal,
  } = useDisclosure();

  const { user } = useAuth((store) => ({
    user: store.user,
  }));

  const processPayment = async () => {
    try {
      const { data } = await createCheckoutSessionApi({
        planId: currentPlanId,
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

  const HandlePaymentClick = async (planId) => {
    setCurrentPlanId(planId);
  };

  useEffect(() => {
    if (initialRun.current == false) {
      initialRun.current = true;
      return;
    } else {
      try {
        setLoader(true);
        const handlePayment = async () => {
          if (user) {
            await processPayment();
          } else {
            onOpenLoginModal();
          }
        };
        handlePayment();
      } catch (e) {
        setLoader(false);
        addError("Error in processing subscription ");
      }
    }
  }, [currentPlanId]);

  function PricePlan({ plan }) {
    const { planName, priceDetails, features, planId, showPricingButton } =
      plan;
    return (
      <Flex
        flexDirection={"column"}
        shadow="base"
        borderWidth="1px"
        zIndex="1"
        alignSelf="stretch"
        borderColor={useColorModeValue("gray.200", "gray.500")}
        borderRadius={"xl"}
        bg="#000"
      >
        <Box py={{ base: "2", sm: "4" }} color={"white"}>
          <Text fontWeight="500" fontSize={{ base: "l", sm: "2xl" }}>
            {planName}
          </Text>
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
                fontSize={{ base: "sm", sm: "sm", md: "2xl" }}
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
            {showPricingButton && (
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
      <Flex
        h={"100vh"}
        align={"center"}
        justify={"center"}
        id="pricing-section"
        className="snap-section theme-gradient"
      >
        <Box mt={16}>
          <VStack spacing={2} textAlign="center" color={"#fff"} mt={4}>
            <Heading fontSize={{ base: "3xl", md: "6xl" }}>
              Plans that fit your need
            </Heading>
            <Text fontSize={{ base: "xl", md: "2xl" }} color={"white.500"}>
              pick one that suits you.
            </Text>
          </VStack>

          <Stack
            direction={{ md: "row" }}
            textAlign="center"
            justify="center"
            spacing={{ base: 4, lg: 10 }}
            py={10}
          >
            {pricingPlanConfig.map((plan, i) => (
              <PricePlan key={i} plan={plan} />
            ))}
          </Stack>
        </Box>
      </Flex>
      <LoginModal
        isOpen={isOpenLoginModal}
        onOpen={onOpenLoginModal}
        onClose={onCloseLoginModal}
        fn={processPayment}
      />
    </>
  );
}
