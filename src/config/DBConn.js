import mongoose from "mongoose";

const global = {};

const connectDB = async () => {
  try {
    if (global.isConnected) {
      console.log("already connected");
      return;
    }
    if (mongoose.connections.length > 0) {
      global.isConnected = mongoose.connections[0].readyState;
      if (global.isConnected === 1) {
        console.log("use previous connection");
        return;
      }
      await mongoose.disconnect();
    }
    const db = await mongoose.connect(process.env.DATABASE_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("new connection");
    global.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
