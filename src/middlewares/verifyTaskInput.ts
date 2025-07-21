import { Request, Response, NextFunction } from "express";

export function verifyTaskInput(req: Request, res: Response, next: NextFunction) {
    const { title, description} = req.body;
     
    if(!title){
        return res.status(400).json({message: "Please provide a title for the task"})
    }
    if(!description){
        return res.status(400).json({message: "please provide a description for the task"})

    }
    next();

}
