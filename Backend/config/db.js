import mongoose from "mongoose";


const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://lyengChiev:Lyeng12345@mernapp.q1anbjw.mongodb.net/Ecommerce?retryWrites=true&w=majority`);
    console.log(`Successfully connnected to mongoDB 👍`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;