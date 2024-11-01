import { Router } from "express";
import {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
} from "../controllers/tasks.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/tasks", authRequired, getTasks);
router.get("/tasks/:id", authRequired, getTask);
router.post("/tasks", authRequired, createTask);
router.delete("/tasks/:id", authRequired, deleteTask);
router.put("/tasks/:id", authRequired, updateTask);

export default router;
