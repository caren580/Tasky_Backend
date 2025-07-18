import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

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

