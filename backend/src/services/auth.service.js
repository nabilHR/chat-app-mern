import crypto from "crypto";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

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
  const refreshTokenHash =  crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");
  // console.log('login:', refreshTokenHash);
  user.refreshTokenHash = refreshTokenHash;
  // console.log("login console", user.refreshTokenHash);
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

export async function refreshAccessToken(refreshToken) {
  // 1) Verify JWT cryptographically
  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch {
    throw new Error("Invalid refresh token");
  }

  // 2) Find user
  const user = await User.findById(decoded.sub);
  // console.log("I am here");
  if (!user) {
    throw new Error("USER NOT FOUND");
  }

  // 3) Compare token with DB hash
  const hashedInRefreshTk = crypto.createHash("sha256").update(refreshToken).digest("hex");
  // console.log(refreshToken);
  // console.log(hashedInRefreshTk);
  // console.log("hashed ", user.refreshTokenHash);
  const isValid = user.refreshTokenHash === hashedInRefreshTk ? true : false;
  // console.log(isValid);
  if (!isValid) {
    // 🚨 TOKEN REUSE DETECTED
    user.refreshTokenHash = "";
    await user.save();
    throw new Error("Refresh token reuse detected");
  }

  // 4) Rotate tokens
  const newAccessToken = signAccessToken(user._id);
  const newRefreshToken = signRefreshToken(user._id);

  // console.log("new refresh ", newRefreshToken);
  user.refreshTokenHash = crypto
    .createHash("sha256")
    .update(newRefreshToken)
    .digest("hex");
  // console.log("new hashed ", user.refreshTokenHash);
  await user.save();

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}

export async function logoutUser(req) {
  const refreshToken = req.cookies?.refreshToken;

  // Idempotent: if no token, just succeed
  if (!refreshToken) return;

  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch {
    // Invalid/expired token → still logout
    return;
  }

  // Revoke session
  await User.findByIdAndUpdate(decoded.sub, {
    $set: { refreshTokenHash: "" },
  });
}