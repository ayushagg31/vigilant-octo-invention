"use client";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { Tag, TagLabel, TagCloseButton, Link } from "@chakra-ui/react";
import { useCollections } from "../../store/useCollections";
import { useRouter } from "next/router";
import { useAuth } from "../../store/useAuth";
import {
  fetchCollectionsApi,
  deleteCollectionApi,
} from "../../services/client.service";
import { AiOutlineLink } from "react-icons/ai";
import { useAPIError } from "../../hooks/useApiHook";

const TagDoc = ({ collectionEl, size }) => {
  const { addError } = useAPIError();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

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

  const handleCloseCollection = async (collectionId) => {
    try {
      const data = await deleteCollectionApi({ collectionId });
      setCollections(data?.collections || []);
    } catch (e) {
      throw new Error("Error in deleting your doc", e);
    }
  };

  const creatLink = ({ collectionId, fileType, ytUrl }) => {
    if (fileType == "mp3") {
      return `/docinsights?id=${collectionId}&yt=${btoa(ytUrl)}`;
    }
    return `/docinsights?id=${collectionId}`;
  };

  if (!mounted) return <></>;
  return (
    <>
      <Tag
        size={size}
        border="2px"
        borderColor={"black"}
        colorScheme="gray"
        variant="subtle"
      >
        <TagLabel>
          <Link as={NextLink} href={creatLink(collectionEl)}>
            {collectionEl.collectionName}
          </Link>
        </TagLabel>
        <AiOutlineLink />
        <TagCloseButton
          style={{ cursor: "pointer" }}
          onClick={() => handleCloseCollection(collectionEl.collectionId)}
        />
      </Tag>
    </>
  );
};

export default TagDoc;
