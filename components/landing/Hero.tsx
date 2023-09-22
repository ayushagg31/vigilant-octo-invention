"use client";

import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  IconProps,
  useDisclosure,
  Img,
} from "@chakra-ui/react";
import { useAuth } from "../../store/useAuth";
import { useRouter } from "next/router";
import { IoMdArrowForward } from "react-icons/io";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { TypeAnimation } from "react-type-animation";

import { LoginModal } from "../home/LoginModal";

export default function Hero() {
  let router = useRouter();

  const {
    isOpen: isOpenLoginModal,
    onOpen: onOpenLoginModal,
    onClose: onCloseLoginModal,
  } = useDisclosure();

  const { user, loadingUser, logout } = useAuth((store) => ({
    user: store.user,
    loadingUser: store.loadingUser,
    logout: store.logout,
  }));

  const gotoDashboard = () => router.push("/dashboard");
  const tryItHandler = () => {
    if (user) {
      gotoDashboard();
    } else {
      onOpenLoginModal();
    }
  };

  const demoHandler = () => {
    const url = "/docinsights?id=f5fa43d2-4497-49f4-afd4-8770af911c6f";
    router.push(url);
  };

  return (
    <Box
      id="how-it-works"
      className="snap-section theme-gradient"
      h={"100vh"}
      pos={"relative"}
      pt={10}
    >
      <Container maxW={"5xl"}>
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 4, md: 5 }}
          py={{ base: 20, md: 28 }}
        >
          <div>
            <Heading
              fontWeight={800}
              color={"#fff"}
              fontSize={{ base: "3xl", sm: "7xl", lg: "8xl" }}
              mb={6}
              height={{ base: "120px", sm: "250px" }}
            >
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  "Chat With Documents",
                  2000, // wait 1s before replacing "Mice" with "Hamsters"
                  "Chat With Youtube Videos",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </Heading>
            <Text
              display={"inline-block"}
              px={"5"}
              color={"#fff"}
              fontSize={{ base: "md", sm: "3xl", md: "5xl" }}
              backgroundColor={"rgb(30 30 58)"}
              rounded={"8"}
            >
              Save countless hours
            </Text>
          </div>
          <Text
            as="b"
            color={"white"}
            className="hero-heading"
            fontWeight={600}
            fontSize={{ base: "md", sm: "2xl" }}
            maxW={"4xl"}
            mt={{ base: 2, md: 8 }}
          >
            Summarize your content, Ask questions and Create notes. Almost
            Instantly.
          </Text>
          <Stack spacing={6} direction={"row"} mt={3}>
            <Button
              rightIcon={<IoMdArrowForward />}
              onClick={() => {
                tryItHandler();
              }}
              size={{ base: "sm", sm: "lg" }}
              colorScheme="green"
            >
              Start for free
            </Button>

            <Button
              onClick={() => demoHandler()}
              px={6}
              size={{ base: "sm", sm: "lg" }}
            >
              See it in action
            </Button>
          </Stack>
        </Stack>
      </Container>
      <Img
        src="/images/rocket.png"
        h={{ base: "150px", sm: "250px", lg: "300px" }}
        className="rocket-animation"
      />

      <Box textAlign={"center"}>
        <BsFillArrowDownCircleFill
          className="movedown-animated"
          color="#fff"
          onClick={() => {
            const releventDiv = document.getElementById("demo-section");
            releventDiv.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
        />
      </Box>
      <LoginModal
        isOpen={isOpenLoginModal}
        onOpen={onOpenLoginModal}
        onClose={onCloseLoginModal}
        fn={gotoDashboard}
      />
    </Box>
  );
}
