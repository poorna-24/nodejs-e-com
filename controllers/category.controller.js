import asyncHandler from "express-async-handler";
import Category from "./../models/Category.js";

// create new category
//Post /api/v1/categories
//Private/admin
export const createCategory = asyncHandler(async (req, res) => {
  const { name, user, image, products } = req.body;

  const categoryExist = await Category.findOne({ name });
  if (categoryExist) {
    throw new Error("Category already exist");
  }
  //create
  const category = await Category.create({
    name: name?.toLowerCase(),
    user: req?.userAuthId,
    image: req?.file?.path,
  });
  res.json({ status: "success", message: "Category created successfully", category });
});

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public

export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.json({
    status: "success",
    message: "Categories fetched successfully",
    result: categories.length,
    categories,
  });
});

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
export const getSingleCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.json({
    status: "success",
    message: "Category fetched successfully",
    category,
  });
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  //update
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    {
      new: true,
    }
  );
  res.json({
    status: "success",
    message: "category updated successfully",
    category,
  });
});

// @desc    delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = asyncHandler(async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    message: "Category deleted successfully",
  });
});
