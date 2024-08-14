import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";

dotenv.config();

const testConnection = async () => {
  try {
    await connectDB();
    console.log("Database connection test successful");
    process.exit(0);
  } catch (error) {
    console.error("Database connection test failed");
    process.exit(1);
  }
};

async function popTest() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error populating database:", error);
  } finally {
    await mongoose.connection.close();
  }
}

popTest();

//testConnection();
