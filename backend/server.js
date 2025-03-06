import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
const port = process.env.PORT || 4000;

import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./lib/connectDB.js";


app.use(express.json());
app.use(cors({ 
  origin: process.env.FRONTEND_URL,  
  credentials: true 
}));

  
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
})