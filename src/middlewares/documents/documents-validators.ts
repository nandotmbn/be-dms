import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import { validateDocuments } from "../../validators";
import message from "../../views/message";

async function documentsValidatorMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const isValid = validateDocuments(req.body);
	if (isValid.error) {
		return res.status(400).send(
			message({
				statusCode: 400,
				data: req.body,
				message: isValid.error.message,
			})
		);
	}

	next();
}

export { documentsValidatorMiddleware };
