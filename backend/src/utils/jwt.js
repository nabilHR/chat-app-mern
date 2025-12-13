import jwt from "jsonwebtoken";
import config from "../config/index.js";

export function signAccessToken(userId) {
  return jwt.sign({ sub: userId }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
}

export function signRefreshToken(userId) {
  return jwt.sign(
    { sub: userId },
    config.jwtSecret, // later you can use a different secret
    { expiresIn: config.refreshTokenExpiresIn }
  );
}