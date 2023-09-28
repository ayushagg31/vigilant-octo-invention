import React from "react";
import { PacmanLoader } from "react-spinners";
import { Text } from "@chakra-ui/react";
import { randomPicker } from "../../utils";
import AIFacts from "../../constants/facts.constans.js";

const RandomLoader = (props) => {
  const RandomLoaderComponent = PacmanLoader;
  return (
    <>
      <RandomLoaderComponent {...props} />
      <Text {...props} fontStyle="italic">
        <q>{randomPicker(AIFacts)}</q>
      </Text>
    </>
  );
};

export default RandomLoader;
