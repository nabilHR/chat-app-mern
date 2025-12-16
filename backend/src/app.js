// src/app.js
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import User from "./models/user.model.js";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import { protect } from "./middlewares/auth.middleware.js";

const app = express();

// security & parsing
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// simple error handler (for now)
// CORS - in prod restrict origin
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*", // replace "*" with your frontend in production
  })
);

// basic rate-limit on all requests (tune for prod)


const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
});
app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || "Server error",
  });
});


app.get("/", (req, res) => res.json({ status: "ok" }));


app.get("/protected", protect, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user,
  });
});



export default app;
