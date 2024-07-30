import asyncHandler from "express-async-handler";
import Coupon from "../models/Coupon.js";

export const createCoupon = asyncHandler(async (req, res) => {
  const { code, startDate, endDate, discount } = req.body;
  //check if admin
  //check if coupon already exists
  const couponExists = await Coupon.findOne({ code });

  if (couponExists) {
    throw new Error("Coupon already exists");
  }
  //check if discount is a number
  if (isNaN(discount)) {
    throw new Error("Discount value must be a number");
  }
  //create coupon
  const coupon = await Coupon.create({
    code: code.toUpperCase(),
    startDate,
    endDate,
    discount,
    user: req.userAuthId,
  });
  res.json({ message: "coupon controller", coupon });
});

//get all coupons
export const getAllCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find();
  res.status(200).json({
    status: "success",
    message: "All coupons",
    totalCount: coupons.length,
    coupons,
  });
});
//get single coupons
export const getSingleCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Individual Coupon fetched",
    coupon,
  });
});

//update coupon
export const updateCoupon = asyncHandler(async (req, res) => {
  const { code, startDate, endDate, discount } = req.body;
  const coupon = await Coupon.findByIdAndUpdate(
    req.params.id,
    {
      code: code?.toUpperCase(),
      discount,
      startDate,
      endDate,
    },
    { new: true }
  );
  res.json({ status: "Success", message: "coupon updated successfully", coupon });
});

//delete coupon
export const deleteCoupon = asyncHandler(async (req, res) => {
  await Coupon.findByIdAndDelete(req.params.id);
  res.json({ status: "success", message: "Coupon deleted successfully" });
});
