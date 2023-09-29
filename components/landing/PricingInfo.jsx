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
import { useEffect, useRef, useState } from "react";
import { useAPIError } from "../../hooks/useApiHook";
import { useCollections } from "../../store/useCollections";
import LemonLoader from "./LemonLoader";
import isUrl from "is-url";

export default function PricingInfo() {
  const [currentPlanId, setCurrentPlanId] = useState(null);
  const [loader, setLoader] = useState(false);
  const initialRun = useRef(false);
  const { addError } = useAPIError();
  const { currentPlan } = useCollections();

  const {
    isOpen: isOpenLoginModal,
    onOpen: onOpenLoginModal,
    onClose: onCloseLoginModal,
  } = useDisclosure();

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
    if (user) {
      await processPayment(planId);
    } else {
      onOpenLoginModal();
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
      <LoginModal
        isOpen={isOpenLoginModal}
        onOpen={onOpenLoginModal}
        onClose={onCloseLoginModal}
        fn={processPayment}
      />
    </>
  );
}
