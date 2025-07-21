import { Router } from "express";
import { registerUser, loginUser,logoutUser, updateUserPassword } from "../controllers/auth.controller";
import { verifyEmailAndUsernameReuse } from "../middlewares/verifyEmailandUsernameReuse"
import { verifyUserInfo } from "../middlewares/verifyUserInfo";
import { verifyLoginInfo } from "../middlewares/verifyLoginInfo";
import { verifyToken } from "../middlewares/verifyToken";

const router=Router();
 router.post("/register", verifyUserInfo, verifyEmailAndUsernameReuse, registerUser);
 router.post("/login", verifyLoginInfo, loginUser);
 router.post("/logout", logoutUser);
 router.patch("/password", verifyToken, updateUserPassword);

 export default router;
