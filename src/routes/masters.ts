import express from "express";
import { master } from "../controllers/master/master.controllers";
import { tokenVerificator } from "../middlewares";

const router = express.Router();

router.get("/", [tokenVerificator, master]);

export { router as masterRoutes };
