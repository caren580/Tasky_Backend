import { Router } from "express";
import { createTask, getAllTasks, getSpecificTask } from "../controllers/task.controller";
import { verifyTaskInput } from "../middlewares/verifyTaskInput";
import verifyToken from "../middlewares/verifyToken"

const router = Router();

router.post("/", verifyToken, verifyTaskInput, createTask);
router.get("/", verifyToken, getAllTasks);
router.get("/:id", verifyToken, getSpecificTask);

export default router;