import Service from "../models/serviceModel.js";
import User from "../models/userModel.js";

// /api/admin/getServices
const getServiceDetails = async (req, res) => {
  try {
    const services = await Service.find();

    // console.log(services);

    res
      .status(200)
      .json({
        success: true,
        services,
        message: "Services fetched successfully",
      });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// /api/admin/fetchUserById/:id
const fetchUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res
      .status(200)
      .json({
        success: true,
        user,
        message: "User fetched successfully",
      });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// /api/admin/fetchServiceById/:id
const fetchServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    res
      .status(200)
      .json({
        success: true,
        service,
        message: "Service fetched successfully",
      });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const rejectDocument = async (req, res) => {
  try {
    let rejectedService = await Service.findOne({ _id: req.params.id });
    rejectedService.status = "Rejected By Admin";
    await rejectedService.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Application rejected successfully ",
      });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const forwardDocument = async (req, res) => {
  try {
    let rejectedService = await Service.findOne({ _id: req.params.id });
    rejectedService.status = "Forwarded to Officer";
    await rejectedService.save();
    res.status(200).json({
      success: true,
      message: "Application Forwarded successfully ",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  getServiceDetails,
  fetchServiceById,
  rejectDocument,
  forwardDocument,
  fetchUserById,
};
