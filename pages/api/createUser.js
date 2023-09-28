// pages/api/createUser.js
import { createUser } from "../../services/firestore.service";
import AuthorizeMiddleware from "../../middlewares/AuthorizeMiddleware";
import logger from "../../services/logging.service";

const createUserHandler = async (req, res) => {
  let user = req?.context?.user;
  try {
    if (user == undefined) {
      logger.error(
        "User creation failed because essential user data is missing",
        req?.context
      );
      return res.status(400).json({
        message: "User creation failed because essential user data is missing",
      });
    }
    await createUser(user);
    return res.status(200).json({
      message: "User created successfully",
    });
  } catch (err) {
    logger.error("/api/createUser", err);
    return res
      .status(500)
      .json({ error: "Failed to create user due to an unexpected error." });
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
    return res
      .status(500)
      .json({ error: "Something went wrong, Please try again later" });
  }
}

export default AuthorizeMiddleware(handler);
