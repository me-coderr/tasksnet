import mongoose from "mongoose";

const connectDB = async () => {
  const URI = process.env.MONGO_URI || "";

  try {
    const connection = await mongoose.connect(URI);
    console.log(`Connected to MongoDB : ${connection.connection.host}`);
  } catch (err) {
    console.error(`\n----\nError while connecting to MongoDB : ${err}\n----\n`);
  }
};

export { connectDB };
