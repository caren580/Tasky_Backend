import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const getUserInfo = async (req: Request, res: Response) => {
    const { id } = req.user;
    try {
        const user = await client.user.findUnique({
            where: { id },
            select: {
                firstName: true,
                lastName: true,
                username: true,
                emailAddress: true,
                dateJoined: true,
                lastProfileUpdate: true,
                avatarUrl: true,

            }
        })
        if (!user) {
            return res.status(404).json({message: "user not found"})
        }
        return res.status(200).json({user}) 
    }catch(e){
        console.error(e);
        return res.status(500).json({message: "Something went wrong"})
    }
}

export const updateUserInfo = async (req: Request, res: Response) => {
    const { id } = req.user;
    const { firstName, lastName, username, emailAddress} = req.body;
    try{
        const updatedUser = await client.user.update({
            where: { id },
            data: {
                firstName,
                lastName,
                username,
                emailAddress,
                lastProfileUpdate: new Date()
            }

        })
        return res.status(200).json({message: "User profile updated successfully", user: updatedUser})
    }catch(e){
        console.error(e);
        return res.status(500).json({message: "Something went wrong"})
    }
} 