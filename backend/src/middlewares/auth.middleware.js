import jwt from "jsonwebtoken";
import config from "../config/index.js";
import User from "../models/user.model.js";

export async function protect(req, res, next) {
  try {
    // 1) Get Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // 2) Extract token
    const token = authHeader.split(" ")[1];

    // 3) Verify token
    const decoded = jwt.verify(token, config.jwtSecret);

    // 4) Find user
    const user = await User.findById(decoded.sub).select(
      "-password -refreshTokenHash"
    );
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 5) Attach user to request
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
}
