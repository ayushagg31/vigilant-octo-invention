import { auth } from "../config/googleAuth.config";
import axios from "axios";


const getCurrentUserToken = async () => {
  try {
    await auth.authStateReady();
    const user = auth?.currentUser;
    if (user == null) {
      return null;
    }
    const token = await user?.getIdToken();
    return token;
  } catch (er) {
    throw new Error("error in fetching from store");
  }
};

export const createUser = async () => {
  const userToken = await getCurrentUserToken();
  if (userToken) {
    try {
      const data = await axios.post("/api/createUser", null, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      throw new Error("Failed to create user", e.message);
    }
  }
};

export const fetchCollectionsApi = async () => {
  const userToken = await getCurrentUserToken();
  if (userToken) {
    try {
      const { data } = await axios.get("/api/fetchCollections", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return data;
    } catch (e) {
      throw new Error("Error in fetching collection", e.message);
    }
  }
};

export const verifyCollectionsApi = async ({ collectionId }) => {
  const userToken = await getCurrentUserToken();
  if (userToken) {
    try {
      const { data } = await axios.post("/api/verifyCollection",
        {
          collectionId,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

      return data;
    } catch (e) {
      throw new Error("Error in fetching collection", e.message);
    }
  }
};

export const deleteCollectionApi = async ({ collectionId }) => {
  const userToken = await getCurrentUserToken();
  if (userToken) {
    try {
      const { data } = await axios.delete("/api/deleteCollection", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        data: {
          collectionId,
        },
      });
      return data;
    } catch (e) {
      throw new Error("Error in deleting collection", e.message);
    }
  }
};

export const uploadDocumentApi = async ({ formData }) => {
  const userToken = await getCurrentUserToken();
  if (userToken) {
    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (e) {
      throw new Error("Error in uploading documents", e.message);
    }
  }
};

export const youtubeTranscribeApi = async ({ ytUrl }) => {
  const userToken = await getCurrentUserToken();
  if (userToken) {
    try {
      const response = await axios.post("/api/ytTranscribe", {
        ytUrl,
      }, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      });
      return response;
    } catch (e) {
      throw new Error("Error in transcribing video", e.message);
    }
  }
};

export const downloadDocApi = async ({ pdfUrl }) => {
  const userToken = await getCurrentUserToken();
  if (userToken) {
    try {
      const response = await axios.post("/api/download",{
        pdfUrl,
      }, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      });
      return response;
    } catch (e) {
      throw new Error("Error in downloading document", e.message);
    }
  }
};
