import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:");
    console.error(`Error name: ${error.name}`);
    console.error(`Error message: ${error.message}`);
    if (error.reason) {
      console.error("Error reason:", error.reason);
    }
    if (error.code) {
      console.error(`Error code: ${error.code}`);
    }
    console.error("Full error object:", error);
    process.exit(1);
  }
};

export default connectDB;
