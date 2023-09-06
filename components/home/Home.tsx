"use client";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { Container, Box, Wrap, WrapItem, Text, Center } from "@chakra-ui/react";
import { useDashboard } from "../../store/useDashboard";
import { useCollections } from "../../store/useCollections";
import { BeforeUpload } from "./BeforeUpload";
import { useRouter } from "next/router";
import { useAuth } from "../../store/useAuth";
import TagDoc from "./TagDoc";
import {
  fetchCollectionsApi,
  deleteCollectionApi,
} from "../../services/client.service";
import { useAPIError } from "../../hooks/useApiHook";
import axios from "axios";

const Home = () => {
  const { addError } = useAPIError();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { showResult, collectionId } = useDashboard((store) => {
    return {
      showResult: store.showResult,
      collectionId: store.result.collectionId,
    };
  });

  const { collections, setCollections } = useCollections((store) => {
    return {
      collections: store.collections,
      setCollections: store.setCollections,
    };
  });

  const { user } = useAuth((store) => ({
    user: store.user,
  }));

  useEffect(() => {
    async function fetchCollections() {
      try {
        const data = await fetchCollectionsApi();
        setCollections(data?.collections || []);
      } catch (e) {
        addError("Error in fetching your docs");
      }
    }
    fetchCollections();
  }, [user?.uid]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePayment = async () => {
    try {
      // https://stripe.com/docs/testing
      // https://stripe.com/docs/india-recurring-payments?integration=paymentIntents-setupIntents#testing
      const { data } = await axios.post("/api/create-checkout-session", {
        userEmail: "agg.ayush.1997@gmail.com",
        priceId: "price_1NjmwMSHPnNdGnAZe9guNYlQ",
        // "price_1NjlWRSHPnNdGnAZTWiu6ymm"
      });
      console.log(data.url);
      window.location.href = data.url;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw new Error("Failed to create user", e.message);
    }
  };

  if (!mounted) return <></>;
  return (
    <div style={{ color: "#000" }}>
      <Container>
        <BeforeUpload />
        {collections.length > 0 && (
          <>
            <Box p={4}>
              <Center>
                <Text as="b" fontSize="xl">
                  Your Documents
                </Text>
              </Center>
            </Box>
            <Box>
              <div style={{ display: "flex" }}>
                <Wrap
                  border="1px"
                  borderColor="rgb(226, 232, 240)"
                  borderRadius="5px"
                  p={5}
                >
                  {collections?.map((collectionEl) => (
                    <WrapItem key={collectionId}>
                      <TagDoc collectionEl={collectionEl} size="sm" />
                    </WrapItem>
                  ))}
                </Wrap>
              </div>
            </Box>
          </>
        )}
        <Box p={2} style={{ border: "1px solid red", background: "pink" }}>
          <button onClick={handlePayment}> Pay here...</button>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
