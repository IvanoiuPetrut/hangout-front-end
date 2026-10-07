import express from "express";
import { rateLimit } from "express-rate-limit";
const router = express.Router();

import { register, login } from "../controllers/authController.js";

// Per client IP, to slow down password guessing and mass account creation
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  // Only failed logins count, so normal use is never blocked
  skipSuccessfulRequests: true,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many login attempts, please try again later" },
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  // Counts accounts actually created, not e.g. "username taken" retries
  skipFailedRequests: true,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many accounts created, please try again later" },
});

router.post("/register", registerLimiter, register);
router.post("/login", loginLimiter, login);

export { router as authRouter };
