import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({
    user: req.user.id,
  }).populate("user");
  res.status(200).json({ tasks });
};

export const createTask = async (req, res) => {
  const { title, description, date } = req.body;
  const newTask = new Task({
    title,
    description,
    date,
    user: req.user.id,
  });
  const savedTask = await newTask.save();
  res.json(savedTask);
};

export const getTask = async (req, res) => {
  const taskFound = await Task.findById(req.params.id);
  if (!taskFound) return res.status(404).json({ message: "Task not found." });
  res.json(taskFound);
};

export const deleteTask = async (req, res) => {
  const taskFound = await Task.findByIdAndDelete(req.params.id);
  if (!taskFound) return res.status(404).json({ message: "Task not found." });
  res.json({ message: "Task deleted" });
};

export const updateTask = async (req, res) => {
  const taskFound = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!taskFound) return res.status(404).json({ message: "Task not found." });
  res.json(taskFound);
};
