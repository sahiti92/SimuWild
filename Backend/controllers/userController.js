const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//!User Signup
const usersController = {
  Signup: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new Error("Please all fields are required");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userCreated = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    res.json({
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated._id,
    });
  }),
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid login credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid login credentials");
    }
    const token = jwt.sign({ id: user._id }, "mykey", {
      expiresIn: "30d",
    });
    res.json({
      message: "Login Success",
      token,
      id: user._id,
      email: user.email,
      username: user.username,
    });
  }),
  profile: asyncHandler(async (req, res) => {
    const user = await User.findById("668e19f4e9bb5a40fc93eb9a");
    if (!user) {
      throw new Error("User not found");
    }
    res.json({ username: user.username, email: user.email });
  }),
  dashboard: asyncHandler(async (req, res) => {
    // Assuming `req.user._id` is set by the authentication middleware
    console.log(req.body);
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
  
    // Customize the data you want to return for the dashboard
    res.json({
      username: user.username,
      email: user.email,
    });
  }),
  changeUserPassword: asyncHandler(async (req, res) => {
    const { newPassword } = req.body;
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save({
      validateBeforeSave: false,
    });
    res.json({ message: "Password Changed successfully" });
  }),
  updateProfile: asyncHandler(async (req, res) => {
    const { email, username } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      req.user,
      { username, email },
      {
        new: true,
      }
    );
    res.json({ message: "User Profile updated successfully", updatedUser });
  }),
};

module.exports = usersController;
