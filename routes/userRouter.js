import express from "express";
import {
  getUsers,
  updateUser,
  applyService,
  decodeService,
  cancelService,
} from "../controller/userController.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/getUsers", getUsers);
userRouter.post("/updateUser", upload.single("image"), updateUser);
userRouter.post("/applyService", applyService);
userRouter.post("/decodeService", decodeService);
userRouter.post("/cancelService", cancelService);

export default userRouter;
