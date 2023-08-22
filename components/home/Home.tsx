import React from "react";
import Fame from "./Fame";
import { Container } from '@chakra-ui/react'
import { useDashboard } from "../../store/useDashboard";
import { BeforeUpload } from "./BeforeUpload";
import { useRouter } from 'next/router';


const Home = () => {
  const router = useRouter()
  const { showResult, collectionName } = useDashboard((store) => {
    return {
      showResult: store.showResult,
      collectionName: store.result.collectionName
    };
  });

  if (showResult) {
    router.push({ pathname: 'docinsights', query: { id: collectionName } });
  }

  return (
    <div>
      <Container>
        <div>
          <BeforeUpload />
        </div>
      </Container>
    </div>
  );
};

export default Home;
