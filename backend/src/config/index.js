import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "15m",
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "30d",
  saltRounds: parseInt(process.env.SALT_ROUNDS || "10", 10),
  nodeEnv: process.env.NODE_ENV || "development",
};


