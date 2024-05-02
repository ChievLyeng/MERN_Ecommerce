import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

// hash password before save to db
userSchema.pre("save", async function (next) {
  // if password is not modified, skip
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const hashPassword = await bcrypt.hash(this.password, 12);
    this.password = hashPassword;
    next();
  } catch (error) {
    next(error); // Pass any error to the next middleware
  }
});

const User = mongoose.model("User", userSchema);

export default User;
