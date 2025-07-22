import { Router } from "express";
import { createTask, getAllTasks, getSpecificTask, updateTask, deleteTask, restoreDeletedTask, completeTask, incompleteTask } from "../controllers/task.controller";
import { verifyTaskInput } from "../middlewares/verifyTaskInput";
import verifyToken from "../middlewares/verifyToken"

const router = Router();

router.post("/", verifyToken, verifyTaskInput, createTask);
router.get("/", verifyToken, getAllTasks);
router.get("/:id", verifyToken, getSpecificTask);
router.patch("/:id", verifyToken, verifyTaskInput, updateTask);
router.delete("/:id", verifyToken, deleteTask);
router.patch("/restore/:id", verifyToken, restoreDeletedTask);
router.patch("/complete/:id", verifyToken, completeTask);
router.patch("/incomplete/:id", verifyToken, incompleteTask);

export default router;