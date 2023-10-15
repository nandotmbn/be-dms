import { NextFunction, Request, Response } from "express";
import { objectIdValidator } from "../../validators";
import message from "../../views/message";

async function objectIdValidatorMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
	path: "params" | "query" | "body",
	key: string
) {
	const id = req[path][key];
	const { error } = objectIdValidator(id);
	if (error) {
		return res.status(400).send(
			message({
				statusCode: 400,
				message: error.message,
				data: req[path],
			})
		);
	}
	next();
}

export { objectIdValidatorMiddleware };

