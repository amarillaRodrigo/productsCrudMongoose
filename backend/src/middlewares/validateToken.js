import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from ".app.js";
import { SECRET_TOKEN } from "../config";

const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  jwt.verify(token, SECRET_TOKEN, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
  });
  req.user = user;

  next();
};
