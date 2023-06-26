import mongoose from "mongoose";

let isConnected = false;

const uri = process.env.NEXT_APP_MONGO_URI || "";

export async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    // Connect to the MongoDB database
    await mongoose.connect(uri);

    isConnected = true;
    console.log("Connected to the database");
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      console.error("Error connecting to the database:", error.message);
    } else {
      console.error("Error connecting to the database:", error);
    }
  }
}

export default mongoose;
