// packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoute.js"
import morgan from "morgan"
dotenv.config();

const port = 3000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parse
app.use(cookieParser());

// http request logger
app.use(morgan("dev"))


app.use("/ecommerce/api/v1/user",userRoutes)

app.listen(port, () => console.log(`Server running on port: ${port}`));