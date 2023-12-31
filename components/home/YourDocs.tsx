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
import TagDoc from "./TagDoc";
import { MdSettings } from "react-icons/md";
import { AiOutlineLink, AiOutlineFilePdf, AiFillDelete } from "react-icons/ai";

let selectedCollection;
const YourDocs = ({ closeDrawer }) => {
  const toast = useToast();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [loading, setLoading] = useState(false)

  const { collectionId } = useDashboard((store) => {
    return {
      collectionId: store.result.collectionId,
    };
  });

  const { collections, deleteCollection } = useCollections((store) => {
    return {
      collections: store.collections,
      deleteCollection: store.deleteCollection,
    };
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderFileIcon = (fileType) => {
    switch (fileType) {
      case "pdf":
        return AiOutlineFilePdf;
      case "mp3":
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
        setLoading(true)
        await deleteCollection(selectedCollection.collectionId);
        setLoading(false)
        router.replace("dashboard")
      } catch (e) {
        setLoading(false)
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
        divider={<StackDivider borderColor="gray.500" />}
        spacing={2}
        align="stretch"
      >
        {React.Children.toArray(collections?.map((collectionEl) => (
          <Box key={collectionId}>
            <Flex align={"center"} justifyContent={"space-between"}>
              <Flex align={"center"}>
                <Box
                  as={renderFileIcon(collectionEl.fileType)}
                  color="green.500"
                  mr={2}
                  minW="30px"
                />
                <TagDoc
                  collectionEl={collectionEl}
                  closeDrawer={closeDrawer}
                  size="sm"
                />
              </Flex>
              <Box minW="30px" ml="2">
                <AiFillDelete
                  fontSize={"1.25rem"}
                  style={{
                    cursor: 'pointer',
                    color: '#F44336'
                  }}
                  onClick={() => handleDelete(collectionEl)}
                />
              </Box>
            </Flex>
          </Box>
        )))}
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
              <Button colorScheme="red"
                isLoading={loading}
                loadingText='Deleting'
                onClick={handleCloseCollection} ml={3}>
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
