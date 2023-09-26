import { Flex, Spinner, Text, Img } from "@chakra-ui/react";

const LoaderScreen = () => {
  return (
    <Flex
      h="100%"
      w="100%"
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Img
        src="/images/rocket.png"
        className="rocket-animation loading-doc"
        h={{ base: "150px", sm: "250px", lg: "300px" }}
      />
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="white.500"
        size="xl"
      />

      <Text mt={4} color={"#fff"}>
        Loading your document...
      </Text>
    </Flex>
  );
};

export default LoaderScreen;
