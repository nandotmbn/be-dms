/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from "express";
import { Users } from "../../models";
import message from "../../views/message";
import _ from "lodash";
import bcrypt from "bcrypt";

async function putUserCredential(req: Request, res: Response) {
	const userId: string = (req.query.user as any)._id as string;

	const user = await Users.findOne({ _id: userId });
	if (!user) {
		return res.status(404).send(
			message({
				statusCode: 404,
				data: req.params,
				message: "User by given id is not found",
			})
		);
	}

	const userExist = await Users.findOne({
		$or: [
			{ _id: { $nin: [userId] }, email: req.body.email },
			{ _id: { $nin: [userId] }, username: req.body.username },
		],
	});
	if (userExist) {
		return res.status(404).send(
			message({
				statusCode: 404,
				data: req.params,
				message: "Email or username has already taken!",
			})
		);
	}

	const isValid = await bcrypt.compare(req?.body?.oldPassword, user?.password!);

	if (!isValid)
		return res.status(401).send(
			message({
				statusCode: 401,
				message: "Old password is not valid!",
				data: req.body,
			})
		);

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	user.username = req.body.username || user.username;
	user.email = req.body.email || user.email;
	user.password = hashedPassword;

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

export { putUserCredential };
