/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from "express";
import { Comments, Documents } from "../../models";
import message from "../../views/message";
import _ from "lodash";

async function updateComments(req: Request, res: Response) {
	const commentId: string = req.params.commentId as string;

	const docs = await Comments.findById(commentId);
	if (!docs) {
		return res.status(404).send(
			message({
				statusCode: 404,
				data: req.params,
				message: "Comments by given id is not found",
			})
		);
	}

	docs.content = req.body.content || docs.content;
	docs.isArchived = req.body.isArchived || false

	const saved = await docs.save();

	const updatedDocument = await Comments.findById(req.params.commentId).select(
		"-createdAt -updatedAt -__v -isArchived"
	);

	return res.send(
		message({
			statusCode: 200,
			message: "Comments updated successfully!",
			data: updatedDocument,
		})
	);
}

export { updateComments };
