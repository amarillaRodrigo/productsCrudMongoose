import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../config.js";

export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound)
      return res.status(400).json({ message: "The email is already in use" });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.status(200).json({
      id: userSaved.id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);
    res.status(200).json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in" });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.status(200).json({ message: "Logged out" });
};

export const profile = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(400).json({ message: "User not found" });

    return res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving profile" });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, SECRET_TOKEN, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    try {
      const userFound = await User.findById(user.id);
      if (!userFound) return res.status(401).json({ message: "Unauthorized" });

      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error verifying token" });
    }
  });
};
