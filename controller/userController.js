import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Service from "../models/serviceModel.js";



// "/api/user/getUsers"

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


// "/api/user/updateUser"

const updateUser = async (req, res) => {
  const { name, phone, token } = req.body;
  console.log(req.body);
  try {
    let decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    const foundedUser = await User.findOne({ _id: decodedUser.userId });
    foundedUser.fullname = name;
    foundedUser.phone = phone;
    await foundedUser.save();
    res.status(200).json({
      success: true,
      user: foundedUser,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


// "/api/user/applyService"

const applyService = async (req, res) => {
  const {
    token,
    serviceName,
    serviceType,
    name,
    phone,
    status,
    age,
    address1,
    address2,
    pincode,
  } = req.body;
  
  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decodedUser.userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const service = new Service({
      user: user._id,
      serviceType,
      serviceName,
      status,
      name,
      phone,
      age,
      address1,
      address2,
      pincode,
    });
    await service.save();
    user.services.push(service._id);
    await user.save();
    res.status(200).json({
      success: true,
      service,
      user,
      message: "Service applied successfully"
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};



// "/api/user/decodeService"

const decodeService = async (req, res) => {
  const { token } = req.body;
  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decodedUser.userId });
    const services = await Service.find({ user: user._id });
    res.status(200).json({ success: true, services });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}






export { getUsers, updateUser, applyService, decodeService };
