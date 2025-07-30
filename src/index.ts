import express, {Express, Request, Response } from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRoutes from "./routes/auth.route"
import taskRoutes from "./routes/task.route";
import userRoutes from "./routes/user.route";

const app: Express = express();


app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: function (origin, callback) {
    
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      // 'http://localhost:3000',
      'https://tasky-frontend-ai9y.vercel.app',
      "https://tasky-frontend-s2mq-6tj5dpzqw-caren580s-projects.vercel.app",
      // '*',
      
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); 
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));


app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/user', userRoutes);


app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ 
    message: 'Welcome to Tasky API', 
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});


const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});