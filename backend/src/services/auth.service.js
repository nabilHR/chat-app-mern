import bcrypt from "bcrypt";
import User from "../models/user.model.js";

import { signAccessToken, signRefreshToken } from "../utils/jwt.js";


export async function registerUser({ name, email, password }) {
  // 1) Check if email already exists
  const exists = await User.findOne({ email });
  if (exists) {
    const err = new Error("Email already in use");
    err.statusCode = 409;
    throw err;
  }

  // 2) Hash password
  const saltRounds = 10; // can move to config
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // 3) Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // 4) Return safe payload (no password)
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}



export async function loginUser({ email, password }) {
  // 1) Find user
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  // 2) Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  // 3) Generate tokens
  const accessToken = signAccessToken(user._id);
  const refreshToken = signRefreshToken(user._id);

  // 4) Store HASHED refresh token
  const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
  user.refreshTokenHash = refreshTokenHash;
  await user.save();

  // 5) Return safe payload
  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
}