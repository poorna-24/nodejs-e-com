import express from "express";
import { createOrder } from "../controllers/order.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
const orderRouter = express.Router();

orderRouter.post("/", isLoggedIn, createOrder);

export default orderRouter;
