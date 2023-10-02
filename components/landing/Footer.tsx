"use client";

import {
  Box,
  chakra,
  Container,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
  useDisclosure,
  Button
} from "@chakra-ui/react";
import { AiFillDingtalkCircle } from "react-icons/ai";
import { BiMailSend } from "react-icons/bi";
import  FAQComponent  from "../landing/FAQ"

const Logo = (props) => {
  return <AiFillDingtalkCircle size="44px" />;
};

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
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
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }}
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
            <Button onClick={() => onOpenFaqModal()} colorScheme='teal' variant='link'>
              FAQ
            </Button>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader><a href="mailto:sellifyappshq@gmail.com">Support</a></ListHeader>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Stay up to date</ListHeader>
            <Stack direction={"row"}>
              <Input
                placeholder={"Your email address"}
                bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
                border={0}
                _focus={{
                  bg: "whiteAlpha.300",
                }}
              />
              <IconButton
                bg={useColorModeValue("green.400", "green.800")}
                color={useColorModeValue("white", "gray.800")}
                _hover={{
                  bg: "green.600",
                }}
                aria-label="Subscribe"
                icon={<BiMailSend />}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
      <FAQComponent isOpen={isOpenFaqModal} onOpen={onOpenFaqModal} onClose={onCloseFaqModal} />
    </Box>
  );
}
