import User from "../models/userModel.js";
import asyncHanlder from "../middlewares/asyncHandler.js";

const createUser = asyncHanlder(async (req, res) => {
  const { username, email, password } = req.body;

  // validation for user info
  if (!username || !email || !password) {
    throw new Error("Please fill all the input fields!");
  }

  // check if user existing
  const userExists = await User.findOne({ email });
  if (userExists) {
      res.status(400).json({
        result:"User already exist!"
    })
  }

  try {
    const newUser = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      result: "sucess",
      data: {
        newUser,
      },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

export default createUser;
