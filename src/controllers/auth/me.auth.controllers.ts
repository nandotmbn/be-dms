/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from "express";
import { Users } from "../../models";
import message from "../../views/message";
import _ from "lodash";

interface IUser {
	_id: string;
}

async function me(req: Request, res: Response) {
	const user: IUser = req?.query?.user as any;

	const myProfile = await Users.findById(user._id)
		.select("-password -createdAt -updatedAt -__v -isArchived")
		.populate("roles", "name");

	if (!myProfile) {
		return res.status(401).send(
			message({
				statusCode: 401,
				message: "Token is not valid!",
				data: {},
			})
		);
	}
	return res.send(
		message({
			statusCode: 200,
			message: "You have successfully retrieved your profile!",
			data: myProfile,
		})
	);
}

export { me };
