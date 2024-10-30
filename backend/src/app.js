import express from "express";
import morgan from "morgan";
import authRoutes from "../src/routes/auth.routes.js";

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use("/api", authRoutes);

export default app;
