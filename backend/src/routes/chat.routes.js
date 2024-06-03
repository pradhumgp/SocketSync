import express from "express";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

// router.route('/').post(protect,accessChat);

// router.route('/').get(protect,fetchChats);

// router.route('/createGroup).get(protect,createGroup);

// router.route('/renameGroup).put(protect,renameGroup);

// router.route('/removeFromGroup).put(protect,removeFromGroup);

// router.route('/addToGroup').put(protect,addToGroup);

export default router;
