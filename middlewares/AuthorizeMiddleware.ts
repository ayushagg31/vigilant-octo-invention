import { NextRequest } from 'next/server'
import { admin } from '../config/firebaseAdmin.config'
import logger from "../services/logging.service"

export interface Context {
  user: any
}
interface ExtendedNextRequest extends NextRequest {
  context: Context
}

const AuthorizeMiddleware = function (handler) {
  return async function (req: ExtendedNextRequest, res) {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      return res.status(401).json({ message: 'Not authenticated. No Auth header.' })
    }
    const token = authorization?.split(' ')[1]
    if (token === null || token === 'null') {
      return res.status(401).json({ message: 'Not authenticated. No Auth token.' })
    }
    try {
      const decodedIdToken = await admin.auth().verifyIdToken(token);
      if (!decodedIdToken || !decodedIdToken.uid || !decodedIdToken.email) {
        return res.status(401).json({ message: 'Not authenticated.' })
      }
      req.context = {
        user: decodedIdToken
      }
    } catch (error) {
      logger.error(`Auth Middleware - verifyIdToken error for authorization: ${authorization} ${error}`)
      return res.status(401).json({ message: `Error while verifying token. Error: ${error}` })
    }
    // pass back to handler
    return handler(req, res)
  }

}

export default AuthorizeMiddleware;


