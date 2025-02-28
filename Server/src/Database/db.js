import mongoose from "mongoose";
import DB_NAME from "../constant.js";
import "dotenv/config";


const connectionToDb = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    if (connection) {
      console.log("Database connected successfully!!!");
    }
  } catch (error) {
    console.log("Error while connecting to database", error);
  }
};

export default connectionToDb;
