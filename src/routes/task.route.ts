import { Router } from "express";
import { createTask, getAllTasks } from "../controllers/task.controller";
import { verifyTaskInput } from "../middlewares/verifyTaskInput";
import verifyToken from "../middlewares/verifyToken"

const router = Router();

router.post("/", verifyToken, verifyTaskInput, createTask);
router.get("/", verifyToken, getAllTasks);

export default router;