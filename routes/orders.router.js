import express from "express";
import { createOrder, getAllOrders, getOrderStats, getSingleOrder, updateOrder } from "../controllers/order.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
const orderRouter = express.Router();

orderRouter.post("/", isLoggedIn, createOrder);
orderRouter.get("/", isLoggedIn, getAllOrders);
orderRouter.get("/:id", isLoggedIn, getSingleOrder);
orderRouter.put("/update/:id", isLoggedIn, updateOrder);
orderRouter.get("/sales/stats", isLoggedIn, getOrderStats);

export default orderRouter;
