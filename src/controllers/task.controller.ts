import {Request, Response} from 'express';
import { PrismaClient} from '@prisma/client';

const client = new PrismaClient();

export const createTask = async (req: Request, res: Response) => {
    const { title, description} = req.body;
    const { id }= req.user;
    try{
        const newtask = await client.task.create({
            data:{
                title,
                description,
                userId: id

            }
        })
        res.status(201).json({message: "Task Created Successfully", task: newtask})
    }catch(e){
        console.error(e);
        res.status(500).json({message: 'Something went wrong'})
    }
}

export const getAllTasks = async (req: Request, res: Response)=> {
    try{
        const tasks = await client.task.findMany({
            where: {
                userId: req.user.id,
                isDeleted: false
            },
            include: {
                user:{
                    select: {
                        username: true,
                    emailAddress: true,
                    }
                }
            }
        })
        res.status(200).json({tasks})
    }catch(e){
        console.error(e)
        res.status(500).json({message: 'Something went wrong'})
    }
}