import express from "express";
import { chats } from "../data/data.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";

const app = express();
dotenv.config();
connectDB();

app.get('/', (req, res)=>{
    res.send("api is running");
});

app.get('/api/chat', (req, res)=>{
    res.send(chats);
});

app.get('/api/chat', (req, res)=>{
    res.send(chats);
});

app.get('/api/chat/:id', (req, res)=>{
    // console.log(req.params.id);
    const singleChat = chats.find(chat=> chat._id === req.params.id);
    res.send(singleChat);
});

app.listen(process.env.PORT, console.log(`app started on port ${process.env.PORT}`.yellow.bold));