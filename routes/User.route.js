import express from "express";
import { registerUser, loginUser, getUserProfileCtrl } from "../controllers/users.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", isLoggedIn, getUserProfileCtrl);

export default userRouter;
