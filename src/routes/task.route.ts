import { Router } from "express";
import { createTask, getAllTasks, getSpecificTask, updateTask } from "../controllers/task.controller";
import { verifyTaskInput } from "../middlewares/verifyTaskInput";
import verifyToken from "../middlewares/verifyToken"

const router = Router();

router.post("/", verifyToken, verifyTaskInput, createTask);
router.get("/", verifyToken, getAllTasks);
router.get("/:id", verifyToken, getSpecificTask);
router.patch("/:id", verifyToken, verifyTaskInput, updateTask);

export default router;