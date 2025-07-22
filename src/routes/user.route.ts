import { Router } from "express";
import { getUserInfo, updateUserInfo } from "../controllers/user.controller";
import verifyToken  from "../middlewares/verifyToken";

const router = Router();

router.get("/", verifyToken, getUserInfo);
router.patch("/", verifyToken, updateUserInfo);

export default router;