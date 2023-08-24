import React, { useEffect, useState } from "react";
import { Container } from '@chakra-ui/react'
import { useDashboard } from "../../store/useDashboard";
import { useCollections } from "../../store/useCollections"
import { BeforeUpload } from "./BeforeUpload";
import { useRouter } from 'next/router';
import { useAuth } from "../../store/useAuth"
import axios from "axios"

const Home = () => {
  const router = useRouter()
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
    async function fetchCollections(userId) {
      try {
        const { data } = await axios.get("/api/fetchCollections", {
          headers: {
            // should be in lowercase always
            'userid': userId
          }
        });
        setCollections(data?.collections || [])
      }
      catch (err) {
        console.error("Error:", err);
      }
    }
    // if (user) {
    fetchCollections(user?.uid || "3D9dxgUuxjPs3XX5HVpyk8vGyzv2")
    // }
  }, [])


  return (
    <div style={{ color: "#000" }}>
      <Container>
        <div>
          <BeforeUpload />
        </div>
        <div style={{ display: "flex" }}>
          {collections.map(({ collectionId, collectionName }) =>
            <div style={{ width: "300px", height: "100px", textAlign: "center", margin: "auto", border: "1px solid black" }}>
              <a href={`/docinsights?id=${collectionId}`} >{collectionName}</a>
            </div>
          )}
        </div>
      </Container >
    </div >
  );
};

export default Home;
