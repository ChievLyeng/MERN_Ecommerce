import checkId from "../middlewares/checkId.js";
import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  getProductById,
  getAllProducts,
} from "../controllers/productController.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(authenticate, authorizeAdmin, formidable(), createProduct);

router.get("/allProducts", getAllProducts);

router
  .route("/:id")
  .get(getProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProduct)
  .delete(authenticate, authorizeAdmin, deleteProduct);

export const productRoutes = router;
