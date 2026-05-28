import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config()
import connectDB from "./config/db.js";
connectDB()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json());
app.use(cors({credentials:true}));

import authRouter from "./routes/authRoutes.js";

// API Endpoints
app.use('/api/auth',authRouter);

app.listen(port,() => {
  console.log(`app is running on port ${port}`)
})
