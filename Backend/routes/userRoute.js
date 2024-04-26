import express from 'express';
import {createUser} from '../controllers/userController.js';
import {loginUser,logoutCurrentUser} from "../controllers/authController.js"

const router = express.Router();

router.route('/').post(createUser);
router.post("/auth",loginUser)
router.post('/logout',logoutCurrentUser)


export default router;

