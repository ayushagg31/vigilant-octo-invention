"use client";

import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  useDisclosure,
  Img,
} from "@chakra-ui/react";
import { useAuth } from "../../store/useAuth";
import { useRouter } from "next/router";
import { IoMdArrowForward } from "react-icons/io";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { TypeAnimation } from "react-type-animation";
import { jumpToReleventDiv } from "../../utils";
import { getAnalytics, logEvent } from "firebase/analytics";
import { app } from "../../config/googleAuth.config";
import { useEffect } from 'react';
import { LoginModal } from "../home/LoginModal";
import { DEMO_CLICKED } from "../../constants/analytics.constants";

let analytics;
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

  useEffect(() => {
    analytics = getAnalytics(app);
  }, []);

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
              // mb={6}
              height={{ base: "60px", sm: "150px" }}
            >
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  "Chat with PDFs",
                  2000, // wait 1s before replacing "Mice" with "Hamsters"
                  "Chat with Videos",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="hero-heading"
              />
            </Heading>
            <Text
              display={"inline-block"}
              px={"5"}
              color={"#fff"}
              fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
              backgroundColor={"green.500"}
              className="hero-heading"
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
          <Text
            as="b"
            color={"white"}
            className="hero-heading"
            fontWeight={500}
            fontSize={{ base: "sm", sm: "xl" }}
            maxW={"4xl"}
            backgroundColor={"#2645b1"}
            mt={{ base: 2, md: 8 }}
          >

            ⚡️  Use Flash queries for crafting Twitter threads, and extracting valuable insights.
          </Text>
          <Stack spacing={6} direction={"row"} mt={3}>
            <Button
              rightIcon={<IoMdArrowForward />}
              onClick={() => {
                tryItHandler();
              }}
              variant="outline"
              style={{
                background: "#37A169",
                alignSelf: "flex-end",
                color: "#fff",
                padding: "1.25rem 1.5rem",
              }}
            >
              {
                user ? "Go to dashboard" : " Start for free"
              }
            </Button>

            <Button
              onClick={() => {
                logEvent(analytics, DEMO_CLICKED)
                jumpToReleventDiv('demo-section');
              }}
              px={6}
              variant="outline"
              style={{
                background: "#101219",
                borderColor: "#000",
                alignSelf: "flex-end",
                color: "#fff",
                padding: "1.25rem 1.5rem",
              }}
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
