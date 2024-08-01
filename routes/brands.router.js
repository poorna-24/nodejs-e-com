import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createBrand, deleteBrand, getAllBrands, getSingleBrand, updateBrand } from "../controllers/brand.controller.js";
import isAdmin from "../middlewares/isAdmin.js";

const brandsRouter = express.Router();

brandsRouter.post("/", isLoggedIn, isAdmin, createBrand);
brandsRouter.get("/", getAllBrands);
brandsRouter.get("/:id", getSingleBrand);
brandsRouter.delete("/:id", isLoggedIn, isAdmin, deleteBrand);
brandsRouter.put("/:id", isLoggedIn, isAdmin, updateBrand);

export default brandsRouter;
