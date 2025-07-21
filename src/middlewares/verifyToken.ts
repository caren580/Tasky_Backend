import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserPayload } from "../types";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.authToken; 

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Token missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    req.user = decoded;
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

export default verifyToken;
