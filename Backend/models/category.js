import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Category is required !"],
    maxLength: 32,
    unique: true,
  },
});

export default mongoose.model("Category", categorySchema);