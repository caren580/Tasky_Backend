import { Router } from "express";
import { registerUser, loginUser,logoutUser } from "../controllers/auth.controller";
import { verifyEmailAndUsernameReuse } from "../middlewares/verifyEmailandUsernameReuse"
import { verifyUserInfo } from "../middlewares/verifyUserInfo";
import { verifyLoginInfo } from "../middlewares/verifyLoginInfo";

const router=Router();
 router.post("/register", verifyUserInfo, verifyEmailAndUsernameReuse, registerUser);
 router.post("/login", verifyLoginInfo, loginUser);
 router.post("/logout", logoutUser);

 export default router;
