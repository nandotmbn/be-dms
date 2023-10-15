import { Request, Response } from "express";
import { Comments, Documents } from "../../models";
import message from "../../views/message";

async function createComment(req: Request, res: Response) {

	const isDocExist = await Documents.findById(req.body.documentId)
	if(!isDocExist) {
		return res.status(404).send(
			message({
				statusCode: 404,
				data: req.body,
				message: "Document by given Id is not found!",
			})
		);
	}

	const newComment = new Comments({
		...req.body,
		document: req.body.documentId,
		author: (req.query as any).user._id,
	});

	res.status(201).send(
		message({
			statusCode: 201,
			data: await newComment.save(),
			message: "Comment is successfully created!",
		})
	);
}

export { createComment };
