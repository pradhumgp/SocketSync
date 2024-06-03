import asyncHandler from "express-async-handler";
import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("Please send user id");
    res.status(400).send("Please send user id");
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: userId } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: 'name pic email'
    })

    if(isChat.length > 0) {
        res.send(isChat[0]);
    }
    else{
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
          };
          try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
              "users",
              "-password"
            );
            res.status(200).json(FullChat);
          } catch (error) {
            res.status(400);
            throw new Error(error.message);
          }
    }
});

const fetchChats = asyncHandler(async (req, res) => {
    console.log("complete later");
});
export { accessChat, fetchChats };
