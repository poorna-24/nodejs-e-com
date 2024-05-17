import dotenv from "dotenv";
import dbConnect from "../config/dbConnect.js";
import express from "express";
import userRouter from "../routes/User.route.js";

dotenv.config();
//db connect
dbConnect();
const app = express();

//pass incoming data
app.use(express.json());
app.use("/", userRouter);

export default app;
