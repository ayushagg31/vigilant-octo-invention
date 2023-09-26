import React from "react";
import {
  PacmanLoader,
} from "react-spinners";

const RandomLoader = (props) => {

  const RandomLoaderComponent = PacmanLoader;
  return <RandomLoaderComponent {...props} />;
};

export default RandomLoader;
