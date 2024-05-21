import Product from "../models/Product";
import { asyncHandler } from "express-async-handler";

export const createProduct = asyncHandler(async (req, res) => {
  const { name, desciption, category, sizes, colors, user, price, totalQty } = req.body;
});
