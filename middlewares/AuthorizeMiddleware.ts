import { NextRequest } from 'next/server'
import { admin } from '../config/firebaseAdmin.config'
import logger from "../services/logging.service"
import { doesUserExists } from "../services/firestore.service"

export interface Context {
  user: any
}
interface ExtendedNextRequest extends NextRequest {
  context: Context
}

const AuthorizeMiddleware = function (handler, action = null) {
  return async function (req: ExtendedNextRequest, res) {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      logger.info(`Auth Middleware - Not authenticated. No Auth header.`)
      return res.status(401).json({ message: 'Authentication required. Please log in again.' })
    }
    const token = authorization?.split(' ')[1]
    if (token === null || token === 'null') {
      logger.info(`Auth Middleware - Not authenticated. No Auth token.: ${authorization}`)
      return res.status(401).json({ message: 'Authentication required. Please log in again.' })
    }
    try {
      const decodedIdToken = await admin.auth().verifyIdToken(token);
      if (!decodedIdToken || !decodedIdToken.uid || !decodedIdToken.email) {
        logger.info(`Auth Middleware - Not authenticated.: ${decodedIdToken}`)
        return res.status(401).json({ message: 'Authentication required.' })
      }
      if (action !== "createUser") {
        // check if user exist in the DB
        const isUserExists = await doesUserExists({ userEmail: decodedIdToken.email })
        if (!isUserExists) {
          logger.error(`Auth Middleware - isUserExists error for authorization: ${decodedIdToken.email}}`)
          return res.status(401).json({ message: `404 - User doesn't exist, try login again` })
        }
      }
      req.context = {
        user: decodedIdToken
      }
    } catch (error) {
      logger.error(`Auth Middleware - verifyIdToken error for authorization: ${error}`)
      return res.status(401).json({ message: `Authentication failed.` })
    }
    // pass back to handler
    return handler(req, res)
  }

}

export default AuthorizeMiddleware;


