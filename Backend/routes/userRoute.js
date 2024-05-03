import express from "express";
import {
  createUser,
  getAllUser,
  getCurrentUser,
  updateCurrentUser,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
import { loginUser, logoutCurrentUser } from "../controllers/authController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUser);

router
  .route("/profile")
  .get(authenticate, getCurrentUser)
  .put(authenticate, updateCurrentUser);

// Admin Route
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);

export default router;
