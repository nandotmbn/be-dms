import { NextFunction, Request, Response, Router } from "express";
import {
	createComment,
	deleteComments,
	getCommentsByDocId,
	getCommentsById,
	updateComments,
} from "../controllers/comments";
import { objectIdValidatorMiddleware, tokenVerificator } from "../middlewares";
import { commentsValidatorMiddleware } from "../middlewares/comments/comments-validators";

const router = Router();

// Get All Comments with Archive Status and Pagination
router.get("/commentId/:commentId", [
	tokenVerificator,
	(req: Request, res: Response, next: NextFunction) =>
		objectIdValidatorMiddleware(req, res, next, "params", "commentId"),
	getCommentsById,
]);

// Get Comments with DocumentId
router.get("/documentId/:documentId", [
	tokenVerificator,
	(req: Request, res: Response, next: NextFunction) =>
		objectIdValidatorMiddleware(req, res, next, "params", "documentId"),
	getCommentsByDocId,
]);

// Create Comments
router.post("/", [
	tokenVerificator,
	commentsValidatorMiddleware,
	(req: Request, res: Response, next: NextFunction) =>
		objectIdValidatorMiddleware(req, res, next, "body", "documentId"),
	createComment,
]);

// Update Comments by CommentId
router.put("/commentId/:commentId", [
	tokenVerificator,
	commentsValidatorMiddleware,
	(req: Request, res: Response, next: NextFunction) =>
		objectIdValidatorMiddleware(req, res, next, "params", "commentId"),
	updateComments,
]);

// Delete Comments by CommentId
router.delete("/commentId/:commentId", [
	tokenVerificator,
	(req: Request, res: Response, next: NextFunction) =>
		objectIdValidatorMiddleware(req, res, next, "params", "commentId"),
	deleteComments,
]);

export { router as commentsRoutes };
