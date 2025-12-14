import { registerUser } from "../services/auth.service.js";
import { loginUser } from "../services/auth.service.js";
import { refreshAccessToken } from "../services/auth.service.js";

export async function register(req, res, next) {
  try {
    const user = await registerUser(req.body);
    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
}



export async function login(req, res, next) {
  try {
    const result = await loginUser(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}


export async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token required" });
    }

    const tokens = await refreshAccessToken(refreshToken);
    res.status(200).json(tokens);
  } catch (err) {
    next(err);
  }
}

import { logoutUser } from "../services/auth.service.js";

export async function logout(req, res, next) {
  try {
    await logoutUser(req);

    // Clear cookie if you use cookies
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth/refresh",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
}