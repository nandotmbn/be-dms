import { Request, Response } from "express";
import { Documents } from "../../models";
import message from "../../views/message";

async function createDocument(req: Request, res: Response) {
	const newDocument = new Documents({
		...req.body,
		author: (req.query as any).user._id,
	});

	res.status(201).send(
		message({
			statusCode: 201,
			data: await newDocument.save(),
			message: "Document is successfully created!",
		})
	);
}

export { createDocument };
