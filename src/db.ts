import mongoose from "mongoose";

let isConnected = false;

const uri = process.env.NEXT_APP_MONGO_URI || "";

export async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    // Connect to the MongoDB database
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
}

export default mongoose;
