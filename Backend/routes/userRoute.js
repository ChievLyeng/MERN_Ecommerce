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
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizedAdmin, getAllUser);

router
  .route("/profile")
  .get(authenticate, getCurrentUser)
  .put(authenticate, updateCurrentUser);

// Admin Route
router
  .route("/:id")
  .delete(authenticate, authorizedAdmin, deleteUserById)
  .get(authenticate, authorizedAdmin, getUserById)
  .put(authenticate, authorizedAdmin, updateUserById);

export default router;
