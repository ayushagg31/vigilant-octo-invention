import React, { useEffect } from "react";
import {
  SimpleGrid,
  Text,
  CircularProgressLabel,
  CircularProgress,
  Box,
} from "@chakra-ui/react";
import { plans } from "../../constants/plan.constants";
import { useCollections } from "../../store/useCollections";

const Insights = () => {
  const { usageInfo, currentPlan, updateUsageInfo, fetchCollections } =
    useCollections();
  const {
    pdf: { count: pdfCount },
    mp3: { count: mp3Count },
    query: { count: queryCount },
  } = usageInfo || {};

  const { MAX_DOCUMENT_LIMIT, MAX_QUESTIONS_PER_DAY } = plans[currentPlan];

  useEffect(() => {
    (async () => {
      await updateUsageInfo();
      await fetchCollections();
    })();
  }, []);

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3 }}
      spacing={{ base: 5, lg: 8 }}
    >
      <Box textAlign="center">
        <Text fontSize="lg" mt="8" mb="4">
          Questions Asked
        </Text>

        <CircularProgress
          value={(queryCount / MAX_QUESTIONS_PER_DAY) * 100}
          color="green.400"
          mt={4}
          size="15rem"
        >
          <CircularProgressLabel fontSize={{ base: "3xl", sm: "2xl" }}>
            {queryCount} / {MAX_QUESTIONS_PER_DAY}
          </CircularProgressLabel>
        </CircularProgress>
      </Box>
      <Box textAlign="center">
        <Text fontSize="lg" mt="8" mb="4">
          PDFs Uploaded
        </Text>

        <CircularProgress
          value={(pdfCount / MAX_DOCUMENT_LIMIT["pdf"]) * 100}
          color="green.400"
          mt={4}
          size="15rem"
        >
          <CircularProgressLabel fontSize={{ base: "3xl", sm: "2xl" }}>
            {pdfCount} / {MAX_DOCUMENT_LIMIT["pdf"]}
          </CircularProgressLabel>
        </CircularProgress>
      </Box>
      <Box textAlign="center">
        <Text fontSize="lg" mt="8" mb="4">
          Videos Uploaded
        </Text>

        <CircularProgress
          value={(mp3Count / MAX_DOCUMENT_LIMIT["mp3"]) * 100}
          color="green.400"
          mt={4}
          size="15rem"
        >
          <CircularProgressLabel fontSize={{ base: "3xl", sm: "2xl" }}>
            {mp3Count} / {MAX_DOCUMENT_LIMIT["mp3"]}
          </CircularProgressLabel>
        </CircularProgress>
      </Box>
    </SimpleGrid>
  );
};

export default Insights;
