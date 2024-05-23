import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createBrand, deleteBrand, getAllBrands, getSingleBrand, updateBrand } from "../controllers/brand.controller.js";

const brandsRouter = express.Router();

brandsRouter.post("/", isLoggedIn, createBrand);
brandsRouter.get("/", getAllBrands);
brandsRouter.get("/:id", getSingleBrand);
brandsRouter.delete("/:id", isLoggedIn, deleteBrand);
brandsRouter.put("/:id", isLoggedIn, updateBrand);

export default brandsRouter;
