import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const client = new PrismaClient();

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { firstName, lastName, username, emailAddress, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)

        await client.user.create({
            data: {
                firstName,
                lastName,
                username,
                emailAddress,
                password: hashedPassword
            }
        })
        res.status(201).json({message: "user registered successfully"})
    }catch(e){
        console.error(e);
        res.status(500).json({message : "something went wrong"})
    }
}

export const loginUser= async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const { identifier, password} = req.body;

        const user = await client.user.findFirst({
            where:{
                OR: [
                    { emailAddress: identifier},
                    { username: identifier}
                ]
            }
        })
         if (!user) {
      res.status(401).json({ message: "Invalid credentials!" });
      return;
    }
    const isSimilar = await bcrypt.compare(password, user.password);
    if (!isSimilar) {
      res.status(401).json({ message: "Invalid credentials!" });
      return;
    }
    const {
      password: userPassword,
      dateJoined,
      lastProfileUpdate,
      avatarUrl,
      ...userInfo
    } = user;
    const token = jwt.sign(userInfo, process.env.JWT_SECRET!);
    res.status(200).json({ userInfo, token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const logoutUser = (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('AuthToken', {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
    res.status(200).json({message: "user logged out successfully"})
}
    


