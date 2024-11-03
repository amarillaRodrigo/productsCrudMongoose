import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "../src/routes/auth.routes.js";
import taskRoutes from "../src/routes/tasks.routes.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173/",
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", taskRoutes);

export default app;
