import express, {Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cookieParser from "cookie-parser";

const app: Express = express();;
const prisma = new PrismaClient();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Welcome to Tasky</h1>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});