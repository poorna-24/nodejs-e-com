//imports
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { globalErrHandler, notFound } from "../middlewares/globalErrHandler.js";
//file imports
import dbConnect from "../config/dbConnect.js";
import userRouter from "../routes/User.route.js";
import productRouter from "../routes/Product.route.js";
import categoriesRouter from "../routes/Category.router.js";
import brandsRouter from "../routes/brands.router.js";
import colorRouter from "../routes/colors.router.js";
import reviewRouter from "../routes/review.router.js";
import orderRouter from "../routes/orders.router.js";

dotenv.config();

//db connect
dbConnect();
const app = express();

//pass incoming data
app.use(express.json());
app.use(cors());
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//   })
// );
app.get("/test", (req, res, next) => {
  res.send("special");
});
app.get("/user/:id", (req, res, next) => {
  const { i } = req.params;
  console.log(id);
  console.log("cahndu");

  next();
});
//routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/brands", brandsRouter);
app.use("/api/v1/colors", colorRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);

//err middleware
app.use(notFound);
app.use(globalErrHandler);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({ message, success: false });
});

export default app;
