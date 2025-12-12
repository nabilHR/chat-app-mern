// src/app.js
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();

// security & parsing
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// basic health route
app.get("/", (req, res) => res.json({ status: "ok" }));

export default app;
