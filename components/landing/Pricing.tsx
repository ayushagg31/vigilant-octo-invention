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
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { pricingPlanConfig } from "../../config/pricing.plan"

interface Props {
  children: React.ReactNode;
}

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


function PricePlan({ plan }) {
  const { planName, priceDetails, features } = plan;
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
          {
            features.map((feature) => (
              <ListItem>
                <ListIcon as={FaCheckCircle} rounded={100} color="#fff" bg="black" />
                {feature}
              </ListItem>
            ))
          }
        </List>
        <Box w="80%" pt={7}>
          <Button w="full" rounded={100} colorScheme="black" variant="outline">
            Subscribe
          </Button>
        </Box>
      </VStack>
    </>
  )
}

export default function ThreeTierPricing() {
  return (
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
          {
            pricingPlanConfig.map((plan) => (
              <PriceWrapper>
                <PricePlan plan={plan} />
              </PriceWrapper>
            ))
          }
        </Stack>
      </Box>
    </div>
  );
}
