"use client";

import { Box, Text, VStack, Flex, Heading } from "@chakra-ui/react";
import PricingInfo from "./PricingInfo";
import { useCollections } from "../../store/useCollections";
import { useAuth } from "../../store/useAuth";
import { useEffect } from "react";

export default function Pricing() {
  const { user } = useAuth();
  const { fetchPlanInfo } = useCollections();

  useEffect(() => {
    if (user) {
      (async () => await fetchPlanInfo())();
    }
  }, [user]);

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        id="pricing-section"
        className="snap-section  theme-gradient"
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

          <PricingInfo />
        </Box>
      </Flex>
    </>
  );
}
