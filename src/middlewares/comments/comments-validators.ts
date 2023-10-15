import { NextFunction, Request, Response } from "express";
import { validateComments } from "../../validators/comments.validators";
import message from "../../views/message";
import _ from "lodash";

async function commentsValidatorMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const isValid = validateComments(_.omit(req.body, ["documentId"]));
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

export { commentsValidatorMiddleware };
