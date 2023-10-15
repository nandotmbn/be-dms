/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from "express";
import { Users } from "../../models";
import message from "../../views/message";

async function putUserProfile(req: Request, res: Response) {
	const userId: string = req.params.userId as string;

	const user = await Users.findById(userId);
	if (!user) {
		return res.status(404).send(
			message({
				statusCode: 404,
				data: req.params,
				message: "User by given id is not found",
			})
		);
	}

	user.firstName = req.body.firstName || user.firstName;
	user.lastName = req.body.lastName || user.lastName;
	user.fullName = `${req.body.firstName} ${req.body.lastName}` || user.fullName;
	user.isArchived = req.body.isArchived || false;

	const saved = await user.save();

	const updatedUser = await Users.findById(saved._id)
		.select("-password -createdAt -updatedAt -__v -isArchived")
		.populate("roles", "name");

	return res.send(
		message({
			statusCode: 200,
			message: "User updated successfully!",
			data: updatedUser,
		})
	);
}

export { putUserProfile };
