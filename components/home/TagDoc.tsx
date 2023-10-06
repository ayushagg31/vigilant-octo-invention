"use client";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import {

  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const TagDoc = ({ collectionEl, size, closeDrawer }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const creatLink = ({ collectionId, fileType, ytUrl, collectionName }) => {
    if (fileType == "mp3") {
      return `/docinsights?id=${collectionId}&yt=${btoa(ytUrl)}&name=${(collectionName)}`;
    }
    return `/docinsights?id=${collectionId}&name=${(collectionName)}`;
  };

  if (!mounted) return <></>;
  return (
    <Text
      noOfLines={1}
      as={NextLink}
      href="#"
      style={{ color: "#fff" }}
      onClick={(e) => {
        e.preventDefault();
        closeDrawer();
        setTimeout(() => {
          router.push(creatLink(collectionEl));
        }, 200);
      }}
    >
      {collectionEl.collectionName}
    </Text >
  );
};

export default TagDoc;
