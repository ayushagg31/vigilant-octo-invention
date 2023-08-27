'use client'
import React, { useEffect, useState } from "react";
import NextLink from 'next/link'
import { Container, Box, HStack, Tag, TagLabel, TagRightIcon, Wrap, WrapItem, Text, TagCloseButton, Center } from '@chakra-ui/react'
import { useDashboard } from "../../store/useDashboard";
import { useCollections } from "../../store/useCollections"
import { BeforeUpload } from "./BeforeUpload";
import { useRouter } from 'next/router';
import { useAuth } from "../../store/useAuth";
import { fetchCollectionsApi, deleteCollectionApi } from "../../services/client.utils";
import { Link } from '@chakra-ui/react'
import { AiOutlineLink } from 'react-icons/ai';
import axios from "axios"
const Home = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { showResult, collectionId, } = useDashboard((store) => {
    return {
      showResult: store.showResult,
      collectionId: store.result.collectionId,
    };
  });

  const { collections, setCollections } = useCollections((store) => {
    return { collections: store.collections, setCollections: store.setCollections };
  })

  if (showResult) {
    router.push({ pathname: 'docinsights', query: { id: collectionId } });
  }


  const { user } = useAuth((store) => ({
    user: store.user,
  }));

  useEffect(() => {
    async function fetchCollections() {
      try {
        const data = await fetchCollectionsApi()
        setCollections(data?.collections || [])
      } catch (e) {
        throw new Error('Error in fetching your docs')
      }
    }
    fetchCollections()
  }, [user?.uid])
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCloseCollection = async (collectionId) => {
    try {
      const data = await deleteCollectionApi({ collectionId })
      setCollections(data?.collections || [])
    } catch (e) {
      throw new Error('Error in deleting your doc', e)
    }
  }

  if (!mounted) return <></>;
  return (
    <div style={{ color: "#000" }}>
      <Container>
        <div>
          <BeforeUpload />
        </div>
        <Box p={4}>
          <Center>
            <Text as='b' fontSize='xl'>
              Your Documents
            </Text>
          </Center>

        </Box>
        <Box>
          <div style={{ display: "flex" }}>
            <Wrap border='1px'
              borderColor='rgb(226, 232, 240)'
              borderRadius='5px'
              p={5}
            >
              {collections?.map(({ collectionId, collectionName }) =>

                <WrapItem key={collectionId}>
                  <Tag size='sm' border='2px' borderColor={'black'} colorScheme='gray' variant="subtle">
                    <TagLabel>
                      <Link as={NextLink} href={`/docinsights?id=${collectionId}`}>
                        {collectionName}
                      </Link>
                    </TagLabel>
                    <AiOutlineLink />
                    <TagCloseButton onClick={() => handleCloseCollection(collectionId)} />
                  </Tag>
                </WrapItem>

              )}
            </Wrap>
          </div>

        </Box>
      </Container >
    </div >
  );
};

export default Home;
