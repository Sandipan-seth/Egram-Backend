import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const register = async (req, res) => {
  const { fullname, email, password, phone, role, code } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }
    if (role === "admin" && code !== process.env.ADMIN_CODE) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Admin code" });
    }
    if (role === "officer" && code !== process.env.OFFICER_CODE) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Officer code" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      phone,
      role,
      code,
    });
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // res.cookie("token", token, { httpOnly: true });

    res
      .status(201)
      .json({
        success: true,
        message: "User created successfully",
        user:newUser,
        token,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password, role, code } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid passwprd credentials" });
    }
    if(existingUser.role !== role) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid role credentials" });
    }
    if (existingUser.role === "admin" && code !== process.env.ADMIN_CODE) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Admin code" });
    }
    if (existingUser.role === "officer" && code !== process.env.OFFICER_CODE) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Officer code" });
    }
    const token = jwt.sign(
      { userId: existingUser._id, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, { httpOnly: true });
    res
      .status(200)
      .json({
        success: true,
        message: "User logged in successfully",
        existingUser,
        token
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const decode = async (req, res) => {
  try {
    const {token}= req.body;
    if (!token) return res.json({ success: false, message: "User not logged in" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.userId });
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};




export { register, login, decode, logout };
