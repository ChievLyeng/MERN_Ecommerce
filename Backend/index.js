// packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import { productRoutes } from "./routes/productRoute.js";
import uploadRoutes from "./routes/uploadRoute.js";
import morgan from "morgan";
import cors from "cors";
dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

const corsConfig = {
  origin: ["http://localhost:5174", "http://localhost:5173"],
  methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
  credentials: true,
};

app.use(cors(corsConfig));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie parse
app.use(cookieParser());

// http request logger
app.use(morgan("dev"));

console.log(process.env.NODE_ENV);

app.use("/ecommerce/api/users", userRoutes);
app.use("/ecommerce/api/category", categoryRoutes);
app.use("/ecommerce/api/product", productRoutes);
app.use("/ecommerce/api/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(port, () => console.log(`Server running on port: ${port}`));
