import express from "express";
import {
  fetchServiceById,
  fetchUserById,
  forwardDocument,
  getServiceDetails,
  rejectDocument,
} from "../controller/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/getServices", getServiceDetails);
adminRouter.post("/fetchServiceById/:id", fetchServiceById);
adminRouter.post("/fetchUserById/:id", fetchUserById);
adminRouter.post("/rejectDocument/:id", rejectDocument);
adminRouter.post("/forwardDocument/:id", forwardDocument);


export default adminRouter;