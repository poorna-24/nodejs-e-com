import express from "express";
import { createCoupon, deleteCoupon, getAllCoupons, getSingleCoupon, updateCoupon } from "../controllers/coupon.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

const couponRouter = express.Router();

couponRouter.post("/", isLoggedIn, isAdmin, createCoupon);
couponRouter.get("/", isLoggedIn, getAllCoupons);
couponRouter.get("/:id", isLoggedIn, getSingleCoupon);
couponRouter.put("/update/:id", isLoggedIn, isAdmin, updateCoupon);
couponRouter.delete("/delete/:id", isLoggedIn, isAdmin, deleteCoupon);

export default couponRouter;
