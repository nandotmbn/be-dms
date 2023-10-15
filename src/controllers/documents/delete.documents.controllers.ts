/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from "express";
import { Documents } from "../../models";
import message from "../../views/message";
import _ from "lodash";

interface IUser {
	_id: string;
}

async function deleteDocument(req: Request, res: Response) {
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

	const deleted = await docs.deleteOne();

	return res.send(message({
		statusCode: 200,
		message: "Document is successfully deleted!",
		data: deleted,
	}));
}

export { deleteDocument };
