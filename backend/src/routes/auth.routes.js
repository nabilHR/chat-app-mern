import { Router } from "express";
import { register } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema } from "../validators/auth.validator.js";

import { login } from "../controllers/auth.controller.js";
import { loginSchema } from "../validators/auth.validator.js";


const router = Router();

router.post("/login", validate(loginSchema), login);
router.post("/register", validate(registerSchema), register);

export default router;
