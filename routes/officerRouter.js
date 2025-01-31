import express from "express";
import {
  fetchServiceById,
  forwardDocument,
  getServiceDetails,
  rejectDocument,
} from "../controller/officerController.js";

const officerRouter = express.Router();

officerRouter.post("/getServices", getServiceDetails);
officerRouter.post("/fetchServiceById/:id", fetchServiceById);
officerRouter.post("/rejectDocument/:id", rejectDocument);
officerRouter.post("/forwardDocument/:id", forwardDocument);

export default officerRouter;
