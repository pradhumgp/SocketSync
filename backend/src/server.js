import express from "express";
import { chats } from "../data/data.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

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

app.listen(process.env.PORT, console.log(`app started on ${process.env.PORT}`));