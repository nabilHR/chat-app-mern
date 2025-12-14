import { Router } from "express";
import { register } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema } from "../validators/auth.validator.js";

import { login } from "../controllers/auth.controller.js";
import { loginSchema } from "../validators/auth.validator.js";
import { refresh } from "../controllers/auth.controller.js";
import { logout } from "../controllers/auth.controller.js";


const router = Router();

router.post("/login", validate(loginSchema), login);
router.post("/register", validate(registerSchema), register);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;





