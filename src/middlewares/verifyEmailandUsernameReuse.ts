import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import  zxcvbn from 'zxcvbn'

const client = new PrismaClient();
export async function verifyEmailAndUsernameReuse(req: Request, res: Response, next: NextFunction) {
  const { emailAddress, username, password } = req.body;

  const existingUser = await client.user.findFirst({
    where: {
      OR: [
        { emailAddress },
        { username }
      ]
    }
  });

  if (existingUser) {
    return res.status(409).json({ message: 'Email or username already in use' });
  }

  const { score } = zxcvbn(password);
  if (score < 2) {
    return res.status(400).json({ message: 'Password is too weak' });
  }

  next();
}