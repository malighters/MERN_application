import { Request, Response } from "express"
import { UnauthenticatedError } from "../errors/unauthenticated";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../utils/config";

const authMiddleware = async (req: Request, res: Response, next: Function) => {
  const bearerToken = req.headers.authorization;
  if(!bearerToken || !bearerToken.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication error');
  }

  const token = bearerToken.replace('Bearer ', '');
  
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.app.locals.user = decodedToken;
  }
  catch(err) {
    throw new UnauthenticatedError('Authentication error');
  }

  next();
}

export default authMiddleware;