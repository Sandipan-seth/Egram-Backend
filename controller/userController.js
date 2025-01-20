import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const getUsers = async (req, res) => {
  const { token } = req.body;

  try {
    let decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decodedUser.userId });
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getUsers };
