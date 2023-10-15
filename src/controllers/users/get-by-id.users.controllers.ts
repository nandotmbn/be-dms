/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from "express";
import { Users } from "../../models";
import message from "../../views/message";
import _ from "lodash";

async function getUserById(req: Request, res: Response) {
	const userId: string = (req.params.userId as string) || "";

	const users = await Users.findById(userId)
		.populate({
			path: "roles",
			select: "name",
		})
		.select("-password -createdAt -updatedAt -__v");

	return res.send(
		message({
			statusCode: 200,
			message: "User is successfully retrieved!",
			data: users,
		})
	);
}

export { getUserById };
