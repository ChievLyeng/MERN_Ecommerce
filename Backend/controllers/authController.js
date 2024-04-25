import User from "../models/userModel.js";
import asyncHanlder from "../middlewares/asyncHandler.js";
import generateToken from "../utils/createToken.js";
import bcrypt from "bcryptjs";

const loginUser = asyncHanlder(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordValid) {
      generateToken(res, existingUser._id);

      res.status(201).json({
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });

      return;
    }
  }
});

export { loginUser };
