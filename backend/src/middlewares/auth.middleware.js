import jwt from "jsonwebtoken";
import config from "../config/index.js";
import User from "../models/user.model.js";

export async function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, config.jwtSecret);

    const user = await User.findById(decoded.sub).select(
      "-password -refreshTokenHash"
    );
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
}

