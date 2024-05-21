//imports
import dotenv from "dotenv";
import express from "express";

//file imports
import dbConnect from "../config/dbConnect.js";
import userRouter from "../routes/User.route.js";
import { globalErrHandler, notFound } from "../middlewares/globalErrHandler.js";

dotenv.config();
//db connect
dbConnect();
const app = express();

//pass incoming data
app.use(express.json());

//routes
app.use("/api/v1/users", userRouter);

//err middleware
app.use(notFound);
app.use(globalErrHandler);

// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "internal server error";
//   return res.status(statusCode).json({ message, success: false });
// });

export default app;