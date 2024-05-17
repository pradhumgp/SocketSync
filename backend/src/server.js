import express from "express";
import { chats } from "../data/data.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import userRouter from "./routes/user.routes.js"

const app = express();
dotenv.config();
connectDB();

app.get('/', (req, res)=>{
    res.send("api is running");
});

app.use('/api/user', userRoutes);

app.listen(process.env.PORT, console.log(`app started on port ${process.env.PORT}`.yellow.bold));