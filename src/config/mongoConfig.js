import mongoose from "mongoose";
<<<<<<< HEAD
import { config } from "./config.js";

export const connectMongoDB = async () => {
  return mongoose.connect(config.mongodb.url);
};
=======

export const connetMongoDB=async()=>{
    return mongoose.connect(process.env.MONGO_URL);
    // try {
    //     const conn = await mongoose.connect(process.env.MONGO_URL);
    //     console.log(conn);
    //     console.log("connected");
    // } catch (error) {
    //     console.error(error.message);
    // }
};
>>>>>>> 8c1d449dc92e3403c1bcb75f273cf0a8337358f0
