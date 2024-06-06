import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { accessChat, fetchChats, createGroup, renameGroup, addToGroup, removeFromGroup } from "../controllers/chat.controller.js";

const router = express.Router();

router.route('/').post(protect,accessChat);

router.route('/').get(protect,fetchChats);

router.route('/createGroup').post(protect,createGroup);

router.route('/renameGroup').put(protect,renameGroup);

router.route('/removeFromGroup').put(protect,removeFromGroup);

router.route('/addToGroup').put(protect,addToGroup);

export default router;
