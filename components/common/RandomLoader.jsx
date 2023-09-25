import React from "react";
import {
  ScaleLoader,
  HashLoader,
  BounceLoader,
  PacmanLoader,
} from "react-spinners";

const RandomLoader = (props) => {
  const loaderComponents = [
    ScaleLoader,
    HashLoader,
    BounceLoader,
    PacmanLoader,
  ];
  const randomIndex = Math.floor(Math.random() * loaderComponents.length);
  const RandomLoaderComponent = loaderComponents[randomIndex];
  return <RandomLoaderComponent {...props} />;
};

export default RandomLoader;
