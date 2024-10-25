import mongoose, { connection } from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`Connected to: ${conn.connection.host}`);
  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
  }
};
