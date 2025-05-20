import mongoose from "mongoose";

const connectMongo = async (): Promise<void> => {
  const uri =
    process.env.MONGODB_URI || "mongodb://localhost:27017/chat-service";
  try {
    await mongoose.connect(uri, {
      // @ts-expect-error: options are compatible in latest mongoose
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectMongo;
