import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../config.js";

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      SECRET_TOKEN,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
}
