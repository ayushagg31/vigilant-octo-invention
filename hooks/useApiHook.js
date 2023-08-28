import { useContext } from "react";
import { APIErrorContext } from "../customProviders/apiErrorProvider";
import { APILoaderContext } from "../customProviders/apiLoaderProvider"

export const useAPIError = () => {
  const { error, addError, removeError } = useContext(APIErrorContext);
  return { error, addError, removeError };
}



export const useAPILoader = () => {
  const { loader, addLoader, removeLoader } = useContext(APILoaderContext);
  return { loader, addLoader, removeLoader }
}



