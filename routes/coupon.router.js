import express from "express";
import { createCoupon, deleteCoupon, getAllCoupons, getSingleCoupon, updateCoupon } from "../controllers/coupon.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const couponRouter = express.Router();

couponRouter.post("/", isLoggedIn, createCoupon);
couponRouter.get("/", isLoggedIn, getAllCoupons);
couponRouter.get("/:id", isLoggedIn, getSingleCoupon);
couponRouter.put("/update/:id", isLoggedIn, updateCoupon);
couponRouter.delete("/delete/:id", isLoggedIn, deleteCoupon);

export default couponRouter;
