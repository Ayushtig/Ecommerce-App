import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({
        success: false,
        message: "Authorization token is required",
      });
    }
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store the decoded user information in the request
    next();
  } catch (err) {
    console.log("Token verification error:", err);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (user.role !== 1) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error in admin middleware",
    });
  }
};
