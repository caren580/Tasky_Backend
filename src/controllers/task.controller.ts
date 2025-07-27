// import {Request, Response} from 'express';
// import { PrismaClient} from '@prisma/client';

// const client = new PrismaClient();

// export const createTask = async (req: Request, res: Response) => {
//     const { title, description} = req.body;
//     const { id }= req.user;
//     try{
//         const newtask = await client.task.create({
//             data:{
//                 title,
//                 description,
//                 userId: id

//             }
//         })
//         res.status(201).json({message: "Task Created Successfully", task: newtask})
//     }catch(e){
//         console.error(e);
//         res.status(500).json({message: 'Something went wrong'})
//     }
// }

// export const getAllTasks = async (req: Request, res: Response)=> {
//     try{
//         const tasks = await client.task.findMany({
//             where: {
//                 userId: req.user.id,
//                 isDeleted: false
//             },
//             include: {
//                 user:{
//                     select: {
//                         username: true,
//                     emailAddress: true,
//                     }
//                 }
//             }
//         })
//         res.status(200).json({tasks})
//     }catch(e){
//         console.error(e)
//         res.status(500).json({message: 'Something went wrong'})
//     }
// }

// export const getSpecificTask = async (req: Request, res: Response) =>{
//     const { id: userId } = req.user;
//     const { taskId }= req.params;
//     try{
//         const task = await client.task.findFirst({
//             where: {
//                  id: taskId, userId: userId,
//             },
//             include: {
//                 user: {
//                     select: {
//                         username: true,
//                         emailAddress:true
//                     }
//                 }
//             }
//         })
//         if(!task){
//             return res.status(404).json({message: "Task not found"})
//         }
//         res.status(200).json({task})
//     }catch(e){
//         console.error(e);
//         res.status(500).json({message: "Something went wrong"})
//     }
// }

// export const updateTask = async (req: Request, res: Response) => {
//     const {id: userId} = req.user;
//     const { id: taskId} = req.params;
//     const { title, description} = req.body;
//     try{
//         const existingTask = await client.task.findFirst({
//             where: {
//                 id: taskId,
//                 userId: userId,
//                 isDeleted: false
//             }
//         })
//         if(!existingTask){
//             return res.status(404).json({message: "Task not found"})
//         }
//         const updatedTask = await client.task.update({
//             where: {
//                 id: taskId
//             },
//             data: {
//                 title,
//                 description,
//             }
//         })
//         res.status(200).json({message: "Task updated successfully", task: updatedTask})
//     }catch(e){
//         console.error(e);
//         res.status(500).json({message: "Something went wrong"})
//     }
// } 

// export const deleteTask = async (req: Request, res: Response) => {
//     const { id: userId} = req.user
//     const { id: taskId} = req.params;
//     try{
//         const existingTask = await client.task.findFirst({
//             where: {
//                 id: taskId,
//                 userId: userId,
//                 isDeleted: false
//             }
//         })
//         if(!existingTask){
//             return res.status(404).json({message: "Task not found"})
//         }
//         const deleteTask = await client.task.update({
//             where:{
//                 id: taskId
//             },
//             data: {
//                 isDeleted: true
//             }
            
//         })
//         res.status(200).json({message: "Task deleted successfully", task: deleteTask})
//     }catch(e){
//         console.error(e);
//         res.status(500).json({message: "Something went wrong"})
//     }

// }

// export const getDeletedTasks = async (req: Request, res: Response)=> {
//     try{
//         const tasks = await client.task.findMany({
//             where: {
//                 userId: req.user.id,
//                 isDeleted: true
//             },
//             include: {
//                 user:{
//                     select: {
//                         username: true,
//                         emailAddress: true,
//                         firstName: true,
//                         lastName: true
//                     }
//                 }
//             },
//             orderBy: {
//                 dateUpdated: 'desc'
//             }
//         })
//         res.status(200).json({tasks})
//     }catch(e){
//         console.error(e)
//         res.status(500).json({message: 'Something went wrong'})
//     }
// }

// export const restoreDeletedTask = async ( req: Request, res: Response) => {
//     const { id: userId } = req.user;
//     const { id: taskId } = req.params;
//     try {
//         const restoredTask = await client.task.update({
//             where: {
//                 id: taskId,
//                 userId: userId,
//                 isDeleted: true
//             },
//             data: {
//                 isDeleted: false
//             }
//         })
//         res.status(200).json({message: "Task restored successfully", task: restoredTask})
//     }catch(e){
//         console.error(e);
//         res.status(500).json({message: "Something went wrong"})
//     }
// }

// export const completeTask = async (req: Request, res: Response) => {
//     const { id: userId } = req.user;
//     const { id: taskId } = req.params;
//     try {
//         const existingTask = await client.task.findFirst({
//             where: { id: taskId, userId, isDeleted: false }
//         });

//         if (!existingTask) {
//             return res.status(404).json({ message: "Task not found" });
//         }

//         const completedTask = await client.task.update({
//             where: { id: taskId },
//             data: { isCompleted: true }
//         });
//         res.status(200).json({ message: "Task marked as completed", task: completedTask });
//     } catch (e) {
//         console.error(e);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };

// export const incompleteTask = async (req: Request, res: Response) => {
//     const { id: userId } = req.user;
//     const { id: taskId } = req.params;
//     try {
//         const existingTask = await client.task.findFirst({
//             where: { id: taskId, userId, isDeleted: false }
//         });

//         if (!existingTask) {
//             return res.status(404).json({ message: "Task not found" });
//         }

//         const incompletedTask = await client.task.update({
//             where: { id: taskId },
//             data: { isCompleted: false }
//         });
//         res.status(200).json({ message: "Task marked as incomplete", task: incompletedTask });
//     } catch (e) {
//         console.error(e);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };


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
                        firstName: true,
                        lastName: true
                    }
                }
            },
            orderBy: {
                dateCreated: 'desc'
            }
        })
        res.status(200).json({tasks})
    }catch(e){
        console.error(e)
        res.status(500).json({message: 'Something went wrong'})
    }
}

export const getCompletedTasks = async (req: Request, res: Response)=> {
    try{
        const tasks = await client.task.findMany({
            where: {
                userId: req.user.id,
                isDeleted: false,
                isCompleted: true
            },
            include: {
                user:{
                    select: {
                        username: true,
                        emailAddress: true,
                        firstName: true,
                        lastName: true
                    }
                }
            },
            orderBy: {
                dateUpdated: 'desc'
            }
        })
        res.status(200).json({tasks})
    }catch(e){
        console.error(e)
        res.status(500).json({message: 'Something went wrong'})
    }
}

export const getIncompleteTasks = async (req: Request, res: Response)=> {
    try{
        const tasks = await client.task.findMany({
            where: {
                userId: req.user.id,
                isDeleted: false,
                isCompleted: false
            },
            include: {
                user:{
                    select: {
                        username: true,
                        emailAddress: true,
                        firstName: true,
                        lastName: true
                    }
                }
            },
            orderBy: {
                dateCreated: 'desc'
            }
        })
        res.status(200).json({tasks})
    }catch(e){
        console.error(e)
        res.status(500).json({message: 'Something went wrong'})
    }
}

export const getDeletedTasks = async (req: Request, res: Response)=> {
    try{
        const tasks = await client.task.findMany({
            where: {
                userId: req.user.id,
                isDeleted: true
            },
            include: {
                user:{
                    select: {
                        username: true,
                        emailAddress: true,
                        firstName: true,
                        lastName: true
                    }
                }
            },
            orderBy: {
                dateUpdated: 'desc'
            }
        })
        res.status(200).json({tasks})
    }catch(e){
        console.error(e)
        res.status(500).json({message: 'Something went wrong'})
    }
}

export const getSpecificTask = async (req: Request, res: Response) =>{
    const { id: userId } = req.user;
    const { taskId }= req.params;
    try{
        const task = await client.task.findFirst({
            where: {
                 id: taskId, userId: userId,
            },
            include: {
                user: {
                    select: {
                        username: true,
                        emailAddress:true,
                        firstName: true,
                        lastName: true
                    }
                }
            }
        })
        if(!task){
            return res.status(404).json({message: "Task not found"})
        }
        res.status(200).json({task})
    }catch(e){
        console.error(e);
        res.status(500).json({message: "Something went wrong"})
    }
}

export const updateTask = async (req: Request, res: Response) => {
    const {id: userId} = req.user;
    const { id: taskId} = req.params;
    const { title, description} = req.body;
    try{
        const existingTask = await client.task.findFirst({
            where: {
                id: taskId,
                userId: userId,
                isDeleted: false
            }
        })
        if(!existingTask){
            return res.status(404).json({message: "Task not found"})
        }
        const updatedTask = await client.task.update({
            where: {
                id: taskId
            },
            data: {
                title,
                description,
            }
        })
        res.status(200).json({message: "Task updated successfully", task: updatedTask})
    }catch(e){
        console.error(e);
        res.status(500).json({message: "Something went wrong"})
    }
} 

export const deleteTask = async (req: Request, res: Response) => {
    const { id: userId} = req.user
    const { id: taskId} = req.params;
    try{
        const existingTask = await client.task.findFirst({
            where: {
                id: taskId,
                userId: userId,
                isDeleted: false
            }
        })
        if(!existingTask){
            return res.status(404).json({message: "Task not found"})
        }
        const deleteTask = await client.task.update({
            where:{
                id: taskId
            },
            data: {
                isDeleted: true
            }
            
        })
        res.status(200).json({message: "Task deleted successfully", task: deleteTask})
    }catch(e){
        console.error(e);
        res.status(500).json({message: "Something went wrong"})
    }

}

export const restoreDeletedTask = async ( req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { id: taskId } = req.params;
    try {
        const existingTask = await client.task.findFirst({
            where: {
                id: taskId,
                userId: userId,
                isDeleted: true
            }
        })
        if(!existingTask){
            return res.status(404).json({message: "Deleted task not found"})
        }
        const restoredTask = await client.task.update({
            where: {
                id: taskId
            },
            data: {
                isDeleted: false
            }
        })
        res.status(200).json({message: "Task restored successfully", task: restoredTask})
    }catch(e){
        console.error(e);
        res.status(500).json({message: "Something went wrong"})
    }
}

export const completeTask = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { id: taskId } = req.params;
    try {
        const existingTask = await client.task.findFirst({
            where: { id: taskId, userId, isDeleted: false }
        });

        if (!existingTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        const completedTask = await client.task.update({
            where: { id: taskId },
            data: { isCompleted: true }
        });
        res.status(200).json({ message: "Task marked as completed", task: completedTask });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const incompleteTask = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { id: taskId } = req.params;
    try {
        const existingTask = await client.task.findFirst({
            where: { id: taskId, userId, isDeleted: false }
        });

        if (!existingTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        const incompletedTask = await client.task.update({
            where: { id: taskId },
            data: { isCompleted: false }
        });
        res.status(200).json({ message: "Task marked as incomplete", task: incompletedTask });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const permanentlyDeleteTask = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { id: taskId } = req.params;
    try {
        const existingTask = await client.task.findFirst({
            where: { id: taskId, userId, isDeleted: true }
        });

        if (!existingTask) {
            return res.status(404).json({ message: "Deleted task not found" });
        }

        await client.task.delete({
            where: { id: taskId }
        });
        res.status(200).json({ message: "Task permanently deleted" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Something went wrong" });
    }
};

