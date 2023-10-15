import { NextFunction, Request, Response } from "express";
import { Documents } from "../../models";
import message from "../../views/message";

async function getAllDocuments(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const limit: number = parseInt(req.query.limit as string) || 1;
	const page: number = parseInt(req.query.page as string) || 1;
	const title: string = (req.query.title as string) || "";
	const status: string = (req.query.status as string) || "";
	const isArchived: boolean = req.query.isArchived == "true" ? true : false;
	const userId: string = req.query.userId?.toString() || "";

	const statusFilter = status ? { status } : {};
	const userIdFilter = userId ? { author: userId } : {};

	const queryFilter = {
		...statusFilter,
		...userIdFilter,
		title: { $regex: new RegExp(title, "i") },
		isArchived,
	};

	const docs = await Documents.find(queryFilter)
		.select("-createdAt -updatedAt -__v -isArchived")
		.limit(limit || 1 * 1)
		.populate("author", "fullName _id")
		.skip((page - 1) * limit)
		.sort("title")
		.exec();

	if (!docs.length)
		return res.status(200).send(
			message({
				statusCode: 200,
				data: [],
				message: "Document are not found!",
			})
		);

	res.send(
		message({
			statusCode: 200,
			message: "Document are successfully retrieved!",
			data: docs,
		})
	);
}

export { getAllDocuments };
