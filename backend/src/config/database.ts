import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const db_url: string = process.env.MONGO_DB_URL;
export const connection = async () => {
  console.log(db_url);

  try {
    await mongoose.connect(db_url);
    console.log("connection established");
  } catch (error) {
    console.log("connection refused!", error);
  }
};
