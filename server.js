import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongoDb.js";
import cookieParser from "cookie-parser";



import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import adminRouter from "./routes/adminRouter.js";
// import upload from "./middleware/multer.js";.
import connectCloudinary from "./config/cloudinary.js";
import officerRouter from "./routes/officerRouter.js";


const app = express();
const port = process.env.PORT || 7000;
dotenv.config();
connectCloudinary();
connectDB();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());


// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/officer", officerRouter);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

