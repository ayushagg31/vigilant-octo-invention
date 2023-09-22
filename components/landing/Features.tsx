"use client";

import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { BsFillChatLeftTextFill } from "react-icons/bs";

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function SplitWithImage() {
  return (
    <Flex
      id="demo-section"
      className="snap-section theme-gradient"
      h={"100vh"}
      alignItems={"center"}
    >
      <Box p={{ base: "10", md: "36" }} color="#fff">
        <Box textAlign={"center"} mb={10}>
          <Heading fontSize={{ base: "3xl", md: "4xl" }} mb={6}>
            Get insights in 2 simple steps
          </Heading>
          <Stack align={"center"} spacing={4} fontSize={"20px"}>
            <Stack direction={"row"} align={"center"}>
              <Icon as={FiUploadCloud} w={5} h={5} />
              <Text>Upload or link your PDFs and videos</Text>
            </Stack>
            <Stack direction={"row"} align={"center"}>
              <Icon as={BsFillChatLeftTextFill} w={5} h={5} />
              <Text>Chat with our AI-powered chatbot.</Text>
            </Stack>
          </Stack>
        </Box>

        <Box w={{ base: "100%", md: "75%" }} margin={"0 auto"}>
          <Image
            boxShadow={"xl"}
            border={"1px"}
            rounded={"md"}
            alt={"feature image"}
            src={"/sitegpt.gif"}
            objectFit={"scale-down"}
          />
        </Box>
      </Box>
    </Flex>
  );
}
