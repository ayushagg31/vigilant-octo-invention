import React from "react";
import { Box, Text, VStack, Button } from "@chakra-ui/react";
import { AiFillDingtalkCircle } from "react-icons/ai";
import BackButton from "./BackButton";

export default function Logo(props) {
  return (
    <VStack spacing="24px">
      <Box>
        <AiFillDingtalkCircle size="30px" />
      </Box>
      <Box>
        <Text fontSize="lg" fontWeight="bold">
          YourPDF.chat
        </Text>
      </Box>
      <Box>
        <BackButton />
      </Box>
    </VStack>
  );
}
