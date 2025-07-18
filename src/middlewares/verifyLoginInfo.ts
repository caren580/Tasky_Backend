import { Request, Response, NextFunction } from "express";

export function verifyLoginInfo(req: Request, res: Response, next: NextFunction) {
    const { identifier, password} = req.body;

    if (!identifier) {
        return res.status(400).json({ message: "Please provide a valid username or email address"})
    }
    if (!password) {
        return res.status(400).json({ message: "Please provide a password"})
    }
    next()
}