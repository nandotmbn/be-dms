import { NextFunction, Request, Response } from "express";
import { Documents } from "../../models";
import message from "../../views/message";

async function getDocumentsById(req: Request, res: Response, next: NextFunction) {
	const documentId: string = (req.params.documentId as string) || "";
	const isArchived: boolean = req.query.isArchived == "true" ? true : false;

	const labs = await Documents.findOne({ _id: documentId, isArchived }).populate("author", "fullName _id");
	if (!labs) {
		return res.status(404).send(
			message({
				statusCode: 404,
				message: "Document by given Id is not found",
				data: req.params,
			})
		);
	}

	res.send(
		message({
			statusCode: 200,
			message: "Documents are successfully retrieved!",
			data: labs,
		})
	);
}

export { getDocumentsById };
