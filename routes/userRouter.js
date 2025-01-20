import express from "express";
import { getUsers } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/getUsers", getUsers);

export default userRouter;
