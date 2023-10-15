import { NextFunction, Request, Response } from "express";
import { Roles } from "../../models";
import { ROLES } from "../../static";
import message from "../../views/message";

async function registrationPriviledge(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const roles = await Roles.findById(req.body.rolesId);

	if (!roles) {
		return res.status(404).send(
			message({
				statusCode: 404,
				data: req.body,
				message: "Roles by given Id is not found!",
			})
		);
	}

	const rolesName = roles?.name;

	let isEligible: boolean = false;

	ROLES.forEach((r) => {
		if (r == rolesName) isEligible = true;
	});

	if (!isEligible) {
		return res.status(400).send(
			message({
				statusCode: 400,
				data: req.body,
				message: "Roles by given Id is not eligible!",
			})
		);
	}

	const userRoles: any = req.query.roles;

	if (userRoles.name == "SUPERINTENDENT") {
		if (rolesName == "SUPERINTENDENT") {
			return res.status(403).send(
				message({
					statusCode: 403,
					data: req.body,
					message: "Superintendent cannot be registered!",
				})
			);
		}
	} else if (userRoles.name == "SUPERVISOR") {
		if (rolesName != "STAFF") {
			return res.status(403).send(
				message({
					statusCode: 403,
					data: req.body,
					message: "Superintendent and Supervisor cannot be registered!",
				})
			);
		}
	} else if (userRoles.name == "STAFF") {
		return res.status(403).send(
			message({
				statusCode: 403,
				data: req.body,
				message: "Staff cannot register a user!",
			})
		);
	}

	next();
}

export { registrationPriviledge };
