import express from "express";
import { createOrder, getAllOrders, getSingleOrder, updateOrder } from "../controllers/order.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
const orderRouter = express.Router();

orderRouter.post("/", isLoggedIn, createOrder);
orderRouter.get("/", isLoggedIn, getAllOrders);
orderRouter.get("/:id", isLoggedIn, getSingleOrder);
orderRouter.put("/:id", isLoggedIn, updateOrder);

export default orderRouter;
