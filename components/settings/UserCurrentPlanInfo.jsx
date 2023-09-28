import React, { useEffect } from "react";
import { StatsCard } from "./StatsCard";
import {
  SimpleGrid,
  Text,
  CircularProgressLabel,
  CircularProgress,
  Divider,
  Box,
} from "@chakra-ui/react";
import { FREE_TIER, plans, PLUS_TIER } from "../../constants/plan.constants";
import { useCollections } from "../../store/useCollections";

const plansToShow = [FREE_TIER, PLUS_TIER];

const PaymentInfo = () => {
  const { queryInfo, currentPlan, updateChatCount, fetchCollections } =
    useCollections();
  const { count } = queryInfo || {};

  const {
    MAX_DOCUMENT_LIMIT,
    MAX_PDF_PAGE_COUNT,
    MAX_PDF_SIZE_MB,
    MAX_QUESTIONS_PER_DAY,
    MAX_VIDEO_SIZE_MB,
  } = plans[currentPlan];

  useEffect(() => {
    (async () => {
      await updateChatCount();
      await fetchCollections();
    })();
  }, []);

  return (
    <div>
      <Text fontSize="2xl" mt="8" mb="4">
        Active plan
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
        {plansToShow.map((plan) => {
          return <StatsCard cardType={plan} plans={plans} />;
        })}
      </SimpleGrid>
      <Divider />
      <Box textAlign="center">
        <Text fontSize="2xl" mt="8" mb="4">
          Used chat limit
        </Text>

        <CircularProgress
          value={(count / MAX_QUESTIONS_PER_DAY) * 100}
          color="green.400"
          mt={4}
          size="100%"
        >
          <CircularProgressLabel fontSize={{ base: "3xl", sm: "2xl" }}>
            {count} / {MAX_QUESTIONS_PER_DAY}
          </CircularProgressLabel>
        </CircularProgress>
      </Box>
    </div>
  );
};

export default PaymentInfo;
