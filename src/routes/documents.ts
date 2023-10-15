import { NextFunction, Request, Response, Router } from "express";
import {
	createDocument,
	deleteDocument,
	getAllDocuments,
	getDocumentsById,
	updateDocuments,
} from "../controllers/documents";
import {
	documentsValidatorMiddleware,
	enumChecker,
	objectIdValidatorMiddleware,
	tokenVerificator,
} from "../middlewares";

const router = Router();

// Get All Documents with Archive Status and Pagination
router.get("/", [getAllDocuments]);

// Get Documents with DocumentId
router.get("/documentId/:documentId", [
	(req: Request, res: Response, next: NextFunction) =>
		objectIdValidatorMiddleware(req, res, next, "params", "documentId"),
	getDocumentsById,
]);

// Create Documents
router.post("/", [
	tokenVerificator,
	documentsValidatorMiddleware,
	createDocument,
]);

// Update Documents by DocumentId
router.put("/documentId/:documentId", [
	tokenVerificator,
	documentsValidatorMiddleware,
	(req: Request, res: Response, next: NextFunction) =>
		objectIdValidatorMiddleware(req, res, next, "params", "documentId"),
	updateDocuments,
]);

// Delete Documents by DocumentId
router.delete("/documentId/:documentId", [
	tokenVerificator,
	(req: Request, res: Response, next: NextFunction) =>
		objectIdValidatorMiddleware(req, res, next, "params", "documentId"),
	deleteDocument,
]);

export { router as documentsRoutes };
