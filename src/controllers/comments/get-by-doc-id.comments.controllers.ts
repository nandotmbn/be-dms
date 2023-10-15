import { NextFunction, Request, Response } from "express";
import { Comments, Documents } from "../../models";
import message from "../../views/message";

async function getCommentsByDocId(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const limit: number = parseInt(req.query.limit as string) || 1;
	const page: number = parseInt(req.query.page as string) || 1;
	const isArchived: boolean = req.query.isArchived == "true" ? true : false;

	const queryFilter = {
		document: req.params.documentId,
		isArchived,
	};

	const docs = await Comments.find(queryFilter)
		.select("-createdAt -updatedAt -__v -isArchived")
		.limit(limit || 1 * 1)
		.populate("author", "fullName _id")
		.populate("document", "_id title")
		.skip((page - 1) * limit)
		.exec();

	if (!docs.length)
		return res.status(200).send(
			message({
				statusCode: 200,
				data: [],
				message: "Comments are not found!",
			})
		);

	res.send(
		message({
			statusCode: 200,
			message: "Comments are successfully retrieved!",
			data: docs,
		})
	);
}

export { getCommentsByDocId };
