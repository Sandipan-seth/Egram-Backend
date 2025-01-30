// import mongoose from "mongoose";
// import User from "../models/userModel.js";
import Service from "../models/serviceModel.js";

// /api/admin/getServices
const getServiceDetails = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ success: true, services, message: "Services fetched successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { getServiceDetails };
