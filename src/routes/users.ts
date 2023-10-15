import express, { NextFunction, Request, Response } from "express";
import { login, me, register } from "../controllers/auth";
import {
	enumChecker,
	objectIdValidatorMiddleware,
	supervisorChecker,
	tokenVerificator,
  usersValidatorMiddleware,
} from "../middlewares";
import { deleteUser, getAllUsers, getUserById, putUserProfile } from "../controllers/users";
import { ROLES } from "../static";
import { registrationPriviledge } from "../utils/registration-by-admin";

const router = express.Router();

// Get All Users
router.get("/", [
	tokenVerificator,
	supervisorChecker,
	enumChecker("role", ROLES, "Role", "query"),
	getAllUsers,
]);

// Get User by Id
router.get("/userId/:userId", [
	tokenVerificator,
	supervisorChecker,
	enumChecker("role", ROLES, "Role", "query"),
	(req: Request, res: Response, next: NextFunction) =>
		objectIdValidatorMiddleware(req, res, next, "params", "userId"),
	getUserById,
]);

router.post("/", [
	tokenVerificator,
	supervisorChecker,
	registrationPriviledge,
	(req: Request, res: Response, next: NextFunction) =>
		objectIdValidatorMiddleware(req, res, next, "body", "rolesId"),
	register,
]);

// Update User Profile by UserId
router.put("/userId/:userId/", [
	tokenVerificator,
	supervisorChecker,
	usersValidatorMiddleware,
	(req: Request, res: Response, next: NextFunction) =>
		objectIdValidatorMiddleware(req, res, next, "params", "userId"),
	putUserProfile,
]);

// Delete User Profile by UserId
router.delete("/userId/:userId", [
	tokenVerificator,
	supervisorChecker,
	(req: Request, res: Response, next: NextFunction) =>
		objectIdValidatorMiddleware(req, res, next, "params", "userId"),
	deleteUser,
]);

export { router as userRoutes };
