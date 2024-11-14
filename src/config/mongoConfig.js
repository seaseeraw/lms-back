import mongoose from "mongoose";

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