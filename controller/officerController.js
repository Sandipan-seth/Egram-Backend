import Service from "../models/serviceModel.js";

// /api/admin/getServices
const getServiceDetails = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({
      success: true,
      services,
      message: "Services fetched successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// /api/admin/fetchServiceById/:id
const fetchServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    res.status(200).json({
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
    rejectedService.status = "Rejected By Officer";
    await rejectedService.save();
    res.status(200).json({
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
    rejectedService.status = "Verified";
    await rejectedService.save();
    res.status(200).json({
      success: true,
      message: "Application Verified successfully ",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { getServiceDetails, fetchServiceById, rejectDocument, forwardDocument };
