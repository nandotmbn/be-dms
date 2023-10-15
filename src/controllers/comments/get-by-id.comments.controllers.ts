import { NextFunction, Request, Response } from "express";
import { Comments, Documents } from "../../models";
import message from "../../views/message";

async function getCommentsById(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const commentId: string = (req.params.commentId as string) || "";
	const isArchived: boolean = req.query.isArchived == "true" ? true : false;

	const docs = await Comments.findOne({ _id: commentId, isArchived })
		.populate("author", "fullName _id")
		.populate("document", "_id title");
	if (!docs) {
		return res.status(404).send(
			message({
				statusCode: 404,
				message: "Comment by given Id is not found",
				data: req.params,
			})
		);
	}

	res.send(
		message({
			statusCode: 200,
			message: "Comments are successfully retrieved!",
			data: docs,
		})
	);
}

export { getCommentsById };
