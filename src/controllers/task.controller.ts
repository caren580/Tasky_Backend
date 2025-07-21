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