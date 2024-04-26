import jwt from "jsonwebtoken";
import asyncHanlder from "./asyncHandler.js";
import User from "../models/userModel.js";

const authenticate = asyncHanlder(async (req, res, next) => {
  let token;

  //read jwt from 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {

    //decoded jwt to payload form
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      //find user with decoded token by userId
      req.user = await User.findById(decoded.userId).select("-password");
      
      next();
    } catch (error) {
      res.status(401).json({
        message: "Not authorized, token failed.",
        error,
      });
    }
  } else {
    res.status(401).json({
      message: "Not authorized, token not found.",
    });
  }
});

const authorizedAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({
      message: "Not authorized as an Admin.",
    });
  }
};

export { authenticate, authorizedAdmin };
