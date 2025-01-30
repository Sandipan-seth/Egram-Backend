import express from "express";
import { getServiceDetails } from "../controller/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/getServices", getServiceDetails);


export default adminRouter;