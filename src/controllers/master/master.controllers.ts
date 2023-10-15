/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from "express";
import { Roles } from "../../models";
import message from "../../views/message";

async function master(req: Request, res: Response) {
	const ROLES = await Roles.find();

	res.send(
		message({
			statusCode: 200,
			message: "Master data has successfully retrieved!",
			data: {
				ROLES,
			},
		})
	);
}

export { master };

