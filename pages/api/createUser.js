// pages/api/createUser.js
import { createUser } from "../../utils/firestore.utils"
import { AuthorizeHandler } from "../../middlewares/AuthMiddleware.ts"

const createUserHandler = async (req, res) => {
    try {
        let user = req?.context?.user
        if (user == undefined) {
            return res.status(400).json({ message: "Unable to create user due to missing user data" });
        }
        await createUser(user);
        return res.status(200).json({
            message: "user created"
        });
    } catch (err) {
        console.error("failed to create user", err);
        return res.status(500).json({ error: err.message });
    }
};

async function handler(req, res) {
    try {
        if (req.method === "POST") {
            return await createUserHandler(req, res);
        } else {
            res.status(405).json({ error: "Method Not Allowed" });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}


export default AuthorizeHandler(handler);