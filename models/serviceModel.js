import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    enum: ["New", "Update"],
    required: true,
  },
  serviceName:{
    type: String,
    required: true
  },
  Image: {
    type: String,
    // required: true
  },
  age: {
    type: Number,
  },
  phone: {
    type: Number,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
  },
  pincode: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Applied", "Approved", "Rejected"],
    default: "Applied",
    required: true
  },
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;