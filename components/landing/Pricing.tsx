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
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { pricingPlanConfig } from "../../config/pricing.plan";
import { createCheckoutSessionApi } from "../../services/client.service";
import { useAuth } from "../../store/useAuth";
import { LoginModal } from "../home/LoginModal";
import { useEffect, useRef, useState, useCallback } from "react";
import { useAPIError } from "../../hooks/useApiHook";

interface Props {
  children: React.ReactNode;
}




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


  function PriceWrapper(props: Props) {
    const { children } = props;

    return (
      <Box
        mb={4}
        shadow="base"
        borderWidth="1px"
        alignSelf={{ base: "center", lg: "flex-start" }}
        borderColor={useColorModeValue("gray.200", "gray.500")}
        borderRadius={"xl"}
      >
        {children}
      </Box>
    );
  }


  const processPayment = async () => {
    try {
      const { data } = await createCheckoutSessionApi({
        planId: currentPlanId
      });
      console.log(data.url);
      window.location.href = data.url;
    } catch (e) {
      console.error("Error in processing payment");
    }
  };


  const HandlePaymentClick = async (planId) => {
    setCurrentPlanId(planId);
  }

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
        }
        handlePayment();
      }
      catch (e) {
        setLoader(false);
        addError("Error in processing subscription ");

      }

    }

  }, [currentPlanId])


  function PricePlan({ plan }) {
    const { planName, priceDetails, features, planId, showPricingButton } = plan;
    return (
      <>
        <Box py={4} px={12}>
          <Text fontWeight="500" fontSize="2xl">
            {planName}
          </Text>
          <HStack justifyContent="center">
            <Text fontSize="3xl" fontWeight="600">
              {priceDetails.currency}
            </Text>
            <Text fontSize="5xl" fontWeight="900">
              {priceDetails.amount}
            </Text>
            <Text fontSize="3xl" color="gray.500">
              / {priceDetails.duration}
            </Text>
          </HStack>
        </Box>
        <VStack
          bg={useColorModeValue("gray.50", "gray.700")}
          py={4}
          borderBottomRadius={"xl"}
        >
          <List spacing={3} textAlign="start" px={12}>
            {features.map((feature, i) => (
              <ListItem key={i}>
                <ListIcon
                  as={FaCheckCircle}
                  rounded={100}
                  color="#fff"
                  bg="black"
                />
                {feature}
              </ListItem>
            ))}
          </List>
          <Box w="80%" pt={7}>
            {
              showPricingButton && (
                <Button w="full" isLoading={loader} rounded={100} colorScheme="black" variant="outline" onClick={() => HandlePaymentClick(planId)}>
                  Subscribe
                </Button>
              )
            }

          </Box>
        </VStack>
      </>
    );
  }


  return (
    <>
      <div id="pricing-section">
        <Box py={12}>
          <VStack spacing={2} textAlign="center">
            <Heading as="h1" fontSize="4xl">
              Plans that fit your need
            </Heading>
            <Text fontSize="lg" color={"gray.500"}>
              pick one that suits you.
            </Text>
          </VStack>

          <Stack
            direction={{ base: "column", md: "row" }}
            textAlign="center"
            justify="center"
            spacing={{ base: 4, lg: 10 }}
            py={10}
          >
            {pricingPlanConfig.map((plan, i) => (
              <PriceWrapper key={i}>
                <PricePlan plan={plan} />
              </PriceWrapper>
            ))}
          </Stack>
        </Box>
      </div>
      <LoginModal
        isOpen={isOpenLoginModal}
        onOpen={onOpenLoginModal}
        onClose={onCloseLoginModal}
        fn={processPayment}
      />
    </>


  );
}