import express from "expres";
import authRequired from "../middlewares/validateToken.js";

const router = Router();

router.get("/tasks", (req, res) => res.send("tasks"));

export default router;
