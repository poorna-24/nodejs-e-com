import Product from "../models/Product.js";
import Review from "../models/Review.js";
import asyncHandler from "express-async-handler";

export const createReview = asyncHandler(async (req, res) => {
  const { product, message, rating } = req.body;
  //1. Find the product
  const { productID } = req.params;
  const productFound = await Product.findById(productID).populate("reviews");
  if (!productFound) {
    throw new Error("Product Not Found");
  }
  //check if user already reviewed this product
  const hasReviewed = productFound?.reviews?.find((review) => {
    return review?.user?.toString() === req?.userAuthId?.toString();
  });
  if (hasReviewed) {
    throw new Error("You have already reviewed this product");
  }
  //create review
  const review = await Review.create({
    message,
    rating,
    product: productFound?._id,
    user: req.userAuthId,
  });
  //Push review into product Found
  productFound.reviews.push(review?._id);
  //resave
  await productFound.save();
  res.status(201).json({
    success: true,
    message: "Review created successfully",
  });
});
