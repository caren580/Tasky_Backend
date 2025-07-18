import express, {Express, Request, Response } from 'express';
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route"

const app: Express = express();


app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
// 

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Welcome to Tasky</h1>');
});

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});