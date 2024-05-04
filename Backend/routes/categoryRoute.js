import express from "express";
import {
  createCategory,
  updateCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
} from "../controllers/categoryController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate, authorizeAdmin, createCategory)
  .get(authenticate, authorizeAdmin, getCategoryById);
router.route("/categories").get(getAllCategories);

router.route("/:id")
.delete(authenticate, authorizeAdmin, deleteCategory)
.get(getCategoryById)

router.put("/:categoryId", authenticate, authorizeAdmin, updateCategory);

export default router;
