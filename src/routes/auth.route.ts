import { Router } from "express";
import { registerUser } from "../controllers/auth.controller";
import { verifyEmailAndUsernameReuse } from "../middlewares/verifyEmailandUsernameReuse"
import { verifyUserInfo } from "../middlewares/verifyUserInfo";

const router=Router();
 router.post("/register", verifyUserInfo, verifyEmailAndUsernameReuse, registerUser);

 export default router;
