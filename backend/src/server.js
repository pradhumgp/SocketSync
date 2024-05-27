import express from "express";
import { chats } from "../data/data.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import userRouter from "./routes/user.routes.js"
import { notFound, errorHandler } from "./middlewares/error.middleware.js";

const app = express();
dotenv.config();
connectDB();

app.use(express.json()); // to accept json data

app.get('/', (req, res)=>{
    res.send("api is running");
});

app.use('/api/user', userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, console.log(`app started on port http://localhost:${process.env.PORT}`.yellow.bold));