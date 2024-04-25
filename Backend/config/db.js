import mongoose from "mongoose";

const connectDB = async () => {
  console.log(process.env.NODE_ENV);
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Successfully connnected to mongoDB 👍`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;