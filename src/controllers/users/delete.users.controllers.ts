/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from "express";
import { Users } from "../../models";
import message from "../../views/message";

async function deleteUser(req: Request, res: Response) {
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

	const deleted = await user.deleteOne();

	return res.send(
		message({
			statusCode: 200,
			message: "User is successfully deleted!",
			data: deleted,
		})
	);
}

export { deleteUser };

