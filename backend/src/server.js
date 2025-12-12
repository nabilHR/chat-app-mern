// src/server.js
import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/index.js";

async function start() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("MongoDB connected");

    app.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
