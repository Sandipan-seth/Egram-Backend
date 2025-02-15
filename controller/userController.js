import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Service from "../models/serviceModel.js";
// import cloudinary from "../config/cloudinary.js";/
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

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
  try {
    const { name, phone, token } = req.body;

    let imageUrl = "";

    if (req.file) {
      // Cloudinary upload from buffer
      const uploadPromise = new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );
        stream.end(req.file.buffer); // Send buffer to Cloudinary
      });

      imageUrl = await uploadPromise;
    }

    let decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    const foundedUser = await User.findOne({ _id: decodedUser.userId });

    if (!foundedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    foundedUser.fullname = name;
    foundedUser.phone = phone;
    if (imageUrl) {
      foundedUser.image = imageUrl;
    }

    await foundedUser.save();
    res.status(200).json({
      success: true,
      user: foundedUser,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Update User Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error. Try again later." });
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

  if (
    !serviceName ||
    !serviceType ||
    !name ||
    !phone ||
    !status ||
    !address1 ||
    !pincode
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all the fields" });
  }

  if (serviceType === "New" && !age) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all the fields" });
  }

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
      message: "Service applied successfully",
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
};

const cancelService = async (req, res) => {
  console.log(req.body);
  const { token, serviceId } = req.body;
  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decodedUser.userId });

    let removedService = await Service.findOne({ _id: serviceId });
    await Service.deleteOne({ _id: serviceId });
    user.services = user.services.remove(serviceId);
    await user.save();
    res.status(200).json({
      success: true,
      message: `Service ${removedService.serviceName} Removed successfully`,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export { getUsers, updateUser, applyService, decodeService, cancelService };
