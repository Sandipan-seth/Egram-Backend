import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongoDb.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";


const app = express();
const port = process.env.PORT || 7000;
dotenv.config();
connectDB();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

