import express from 'express';
import {createUser} from '../controllers/userController.js';
import {loginUser} from "../controllers/authController.js"

const router = express.Router();

router.route('/').post(createUser);
router.post("/auth",loginUser)


export default router;

