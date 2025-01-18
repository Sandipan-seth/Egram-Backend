import express from 'express';
import { register, login, decode } from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/decode", decode);


export default authRouter;