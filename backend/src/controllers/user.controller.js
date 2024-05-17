import asyncHandler from "express-async-handler";
import { User } from "../models/user.model";

const registerUser = asyncHandler(async() => {
    const { name, email, password, pic } = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please Enter all the fields");
    }

    const userExists = await User
})