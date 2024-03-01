import mongoose from "mongoose";

async function connectDB() {
    console.log(process.env.MONGO_URI)
  if (mongoose.connections[0].readyState) return;
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.MONGO_URI!);
  console.log("Connected to DB");
}

export default connectDB;