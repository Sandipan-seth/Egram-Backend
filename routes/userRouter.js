import express from "express";
import {
  getUsers,
  updateUser,
  applyService,
  decodeService,
  cancelService
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/getUsers", getUsers);
userRouter.post("/updateUser", updateUser);
userRouter.post("/applyService", applyService);
userRouter.post("/decodeService", decodeService);
userRouter.post("/cancelService", cancelService);

export default userRouter;
