"use client";

import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  Button
} from "@chakra-ui/react";
import { AiFillDingtalkCircle } from "react-icons/ai";
import FAQComponent from "../landing/FAQ"

const Logo = (props) => {
  return <AiFillDingtalkCircle size="44px" />;
};


const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function LandingFooter() {
  const {
    isOpen: isOpenFaqModal,
    onOpen: onOpenFaqModal,
    onClose: onCloseFaqModal,
  } = useDisclosure();

  return (
    <Box
      className="snap-section"
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Logo color={useColorModeValue("gray.700", "white")} />
            </Box>
            <Text fontSize={"sm"}>
              © 2023 YourPDF.chat. All rights reserved
            </Text>
          </Stack>
          <Stack align={"flex-start"}>
            <Button onClick={() => onOpenFaqModal()} variant='link'>
              FAQ
            </Button>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader><a href="mailto:sellifyappshq@gmail.com">Support</a></ListHeader>
          </Stack>
        </SimpleGrid>
      </Container>
      <FAQComponent isOpen={isOpenFaqModal} onOpen={onOpenFaqModal} onClose={onCloseFaqModal} />
    </Box>
  );
}
