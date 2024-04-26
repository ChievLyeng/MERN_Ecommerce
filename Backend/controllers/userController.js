import User from "../models/userModel.js";
import asyncHanlder from "../middlewares/asyncHandler.js";
import generateToken from "../utils/createToken.js";
import { loginUser } from "./authController.js";

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
      message: "User already exist!",
    });
  }

  try {
    const newUser = await User.create({
      username,
      email,
      password,
    });

    const token = await generateToken(res, newUser._id);

    res.status(201).json({
      result: "success",
      data: {
        newUser,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

const getAllUser = asyncHanlder(async (req, res) => {
  const allUser = await User.find({});

  res.status(200).json({
    result: "success",
    data: {
      allUser,
    },
  });
});

const getCurrentUser = asyncHanlder(async (req, res) => {
  //here we get the req.user from authenticate middleware
  // if we do not call authenticate middleware this controller will not work
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      result: "success",
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } else {
    res.status(404).json({
      message: "User not found!",
    });
  }
});

const updateCurrentUser = asyncHanlder(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    (user.username = req.body.username || user.username),
      (user.email = req.body.email || user.email);

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      result: "data updated",
      data: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      },
    });
  } else {
    res.status(404).json({
      message: "User not found!",
    });
  }
});

const deleteUserById = asyncHanlder(async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log(req.param.id);
  console.log(user);

  if (user) {
    if (user.isAdmin) {
      res.status(400).json({
        message: "Cannot delete Admin user!",
      });
    }

    await User.deleteOne({ _id: user._id });

    res.status(404).json({
      message: "User has been removed!",
    });
  } else {
    res.status(404).json({
      message: "User not found!",
    });
  }
});

const getUserById = asyncHanlder(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.status(200).json({
      result: "Success",
      data: user,
    });
  } else {
    res.status(404).json({
      message: "User not found!",
    });
  }
});

const updateUserById = asyncHanlder(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    (user.username = req.body.username || user.username),
      (user.email = req.body.email || user.email),
      (user.isAdmin = Boolean(req.body.isAdmin));
  }
});

export {
  createUser,
  getAllUser,
  getCurrentUser,
  updateCurrentUser,
  deleteUserById,
  getUserById,
  updateUserById,
};
