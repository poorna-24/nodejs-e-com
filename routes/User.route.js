import express from "express";

import { registerUser, loginUser } from "../controllers/users.controller.js";
const userRouter = express.Router();

userRouter.post("/api/v1/users/register", registerUser);
userRouter.post("/api/v1/users/login", loginUser);

export default userRouter;
