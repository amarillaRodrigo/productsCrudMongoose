import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../config.js";

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

export default authRequired;
