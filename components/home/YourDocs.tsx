"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  StackDivider,
  Flex,
  CloseButton,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { useDashboard } from "../../store/useDashboard";
import { useCollections } from "../../store/useCollections";
import { useRouter } from "next/router";
import { useAuth } from "../../store/useAuth";
import TagDoc from "./TagDoc";
import { MdSettings } from "react-icons/md";
import { AiOutlineLink } from "react-icons/ai";

let selectedCollection;
const YourDocs = () => {
  const toast = useToast();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const { showResult, collectionId } = useDashboard((store) => {
    return {
      showResult: store.showResult,
      collectionId: store.result.collectionId,
    };
  });

  const { collections, fetchCollections, deleteCollection } = useCollections(
    (store) => {
      return {
        collections: store.collections,
        fetchCollections: store.fetchCollections,
        deleteCollection: store.deleteCollection,
      };
    }
  );

  const { user } = useAuth((store) => ({
    user: store.user,
  }));

  useEffect(() => {
    try {
      fetchCollections();
    } catch (error) {}
  }, [user?.email]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderFileIcon = (fileType) => {
    switch (fileType) {
      case "pdf":
        return AiOutlineLink;
      default:
        return MdSettings;
    }
  };

  if (!mounted) return <></>;

  if (collections.length === 0) {
    return <h3>No documents found</h3>;
  }

  const handleCloseCollection = async () => {
    if (selectedCollection) {
      try {
        await deleteCollection(selectedCollection.collectionId);
      } catch (e) {
        toast({
          title: e.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
    onClose();
  };

  const handleDelete = (collectionEl) => {
    selectedCollection = collectionEl;
    if (selectedCollection) {
      onOpen();
    }
  };

  return (
    <>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={2}
        align="stretch"
      >
        {collections?.map((collectionEl) => (
          <Box key={collectionId}>
            <Flex align={"center"}>
              <Box
                as={renderFileIcon(collectionEl.fileType)}
                color="green.500"
                mr={2}
              />
              <TagDoc collectionEl={collectionEl} size="sm" />

              <CloseButton
                ml="auto"
                onClick={() => handleDelete(collectionEl)}
              />
            </Flex>
          </Box>
        ))}
        <StackDivider borderColor="gray.200" />
      </VStack>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Sure want to delete "{selectedCollection?.collectionName}"
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleCloseCollection} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default YourDocs;
