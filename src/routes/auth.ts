import express from "express";
import { login, me } from "../controllers/auth";
import { putMyProfile, putUserCredential } from "../controllers/users";
import { selfUpdateMiddleware, tokenVerificator } from "../middlewares";
import { validateUpdateCredential } from "../validators";

const router = express.Router();

router.post("/signin", [login]);
router.get("/me", [tokenVerificator, me]);
router.put("/me", [tokenVerificator, selfUpdateMiddleware, putMyProfile]);
router.put("/credential", [tokenVerificator, validateUpdateCredential, putUserCredential]);

export { router as authRoutes };

