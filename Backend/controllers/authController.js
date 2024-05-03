import User from "../models/userModel.js";
import asyncHanlder from "../middlewares/asyncHandler.js";
import generateToken from "../utils/createToken.js";
import bcrypt from "bcryptjs";

const loginUser = asyncHanlder(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordValid) {
      const token = await generateToken(res, existingUser._id);

      res.status(201).json({
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
        token
      });
   
      return;
    } else {
      res.status(400).json({
        message: "Incorrect password or username !",
      });
    }
  }
});

const logoutCurrentUser = asyncHanlder(async (req, res) => {
  // res.cookie("jwt", "", {
  //   httpOnly: true,
  //   expires: new Date(0),
  // });
  //clear cookie when logout
  res.clearCookie("jwt");

  res.status(200).json({
    message: "Logged out successfully!",
  });
});

export { loginUser, logoutCurrentUser };
