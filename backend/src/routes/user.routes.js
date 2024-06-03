import express from "express";
import { registerUser, loginUser, allUsers } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route('/login').post(loginUser);

router.route('/').get(protect,allUsers);

export default router;
