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
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
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
  console.log(`Fetching chats for user: ${req.user}`);
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .sort({updatedAt: -1})
    .then( async (results) => {
      results = await User.populate(results, {
        path: "latestMessage.sender",
        select: "name pic email",
      });
      res.status(200).json(results);
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const createGroup = asyncHandler(async (req, res) => {
  if(!req.body.users || !req.body.name){
    return res.status(400).send({message: "Please fill all the fields"});
  }

  var users =  JSON.parse(req.body.users);

  if(users.length < 2){
    return res.status(400).send({message: "at least two users are required to create a group"});
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } 
  catch (error) {
    res.status(400);
    throw new Error(error.message);
  }

});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true }
  )
  .populate("users", "-password")
  .populate("groupAdmin", "-password");

  if(!updatedChat){
    return res.status(400).send({message: "Chat not found"});
  }
  else{
    res.status(200).json(updatedChat);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
  {
    $push: { users: userId},
  },
  { new: true }
  )
  .populate("users", "-password")
  .populate("groupAdmin", "-password");

  if(!updatedChat){
    return res.status(400).send({message: "Chat not found"});
  }
  else{
    res.status(200).json(updatedChat);
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId},
    },
  { new: true }
  )
  .populate("users", "-password")
  .populate("groupAdmin", "-password");

  if(!updatedChat){
    return res.status(400).send({message: "Chat not found"});
  }
  else{
    res.status(200).json(updatedChat);
  }
});

export { accessChat, fetchChats, createGroup, renameGroup, addToGroup, removeFromGroup };
