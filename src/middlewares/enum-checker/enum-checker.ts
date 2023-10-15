import { NextFunction, Request, Response } from "express";
import message from "../../views/message";

function enumChecker(queryParams: string, enums: any[], enumName: string, reqAttr: "body" | "query") {
	return (req: Request, res: Response, next: NextFunction) => {
		const queryParameter = req[reqAttr][queryParams];
		if (!queryParameter) {
			return next();
		}

		let isExist = false;
		enums.map((enum_) => {
			if (enum_ == queryParameter) isExist = true;
		});

		if (isExist) return next();

		return res.status(400).send(
			message({
				data: req.query,
				message: enumName + " is not valid!",
				statusCode: 400,
			})
		);
	};
}

export { enumChecker };
