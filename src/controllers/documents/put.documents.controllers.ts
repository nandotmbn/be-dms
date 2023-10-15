/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from "express";
import { Documents } from "../../models";
import message from "../../views/message";
import _ from "lodash";

async function updateDocuments(req: Request, res: Response) {
	const documentId: string = req.params.documentId as string;

	const docs = await Documents.findById(documentId);
	if (!docs) {
		return res.status(404).send(
			message({
				statusCode: 404,
				data: req.params,
				message: "Document by given id is not found",
			})
		);
	}

	docs.title = req.body.title || docs.title;
	docs.content = req.body.content || docs.content;
	docs.status = req.body.status || docs.status;
	docs.isArchived = req.body.isArchived || false

	const saved = await docs.save();

	const updatedDocument = await Documents.findById(saved._id).select(
		"-createdAt -updatedAt -__v -isArchived"
	);

	return res.send(
		message({
			statusCode: 200,
			message: "Document updated successfully!",
			data: updatedDocument,
		})
	);
}

export { updateDocuments };
