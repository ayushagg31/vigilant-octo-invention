
import { auth } from "../config/googleAuth.config";
import { useAuth } from "../store/useAuth";
import axios from "axios";


const getCurrentUserToken = async () => {
    try {
        const user = auth?.currentUser;
        if (user == null) {
            return null;
        }
        const token = await user?.getIdToken();
        return token;
    } catch (er) {
        throw new Error('error in fetching from store')
    }

}



export const createUser = async () => {
    const userToken = await getCurrentUserToken();
    if (userToken) {
        try {
            const data = await axios.post("/api/createUser", null, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            console.log(data);
        } catch (e) {
            console.error("Error adding document: ", e);
            throw new Error("Failed to create user", e.message);
        }
    }
};

export const fetchCollectionsApi = async (userId) => {

    const userToken = await getCurrentUserToken();
    if (userToken) {
        try {
            const { data } = await axios.get("/api/fetchCollections", {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            return data
        } catch (e) {
            throw new Error("Error in fetching collection", e.message);
        }
    }
};


