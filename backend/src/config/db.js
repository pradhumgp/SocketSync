import mongoose from "mongoose";
import { DB_NAME } from "../constants/constants.js";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log(
      `monogoDB connected ${connection.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log(`MongoDB connection Failed ${error.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;
