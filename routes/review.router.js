import express from "express";
import { createReview } from "../controllers/reviews.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const reviewRouter = express.Router();

reviewRouter.post("/:productID", isLoggedIn, createReview);

export default reviewRouter;
