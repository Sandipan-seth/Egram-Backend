import express from 'express';
import { register, login, decode, logout } from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/decode", decode);
authRouter.post("/logout", logout);



export default authRouter;