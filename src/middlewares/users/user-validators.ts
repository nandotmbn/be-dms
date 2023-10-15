import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import { Roles } from "../../models";
import {
	objectIdValidator,
	validateUpdateByAdmin,
	validateUpdateCredential,
	validateUpdateProfile,
} from "../../validators";
import message from "../../views/message";

const usersValidatorMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const isAnyError = validateUpdateByAdmin(_.omit(req.body, ["rolesId"]));
	if (isAnyError.error) {
		return res.status(400).send(
			message({
				data: req.body,
				message: isAnyError.error.message,
				statusCode: 400,
			})
		);
	}

	const isRolesIdError = objectIdValidator(req.body.rolesId);
	if (isRolesIdError.error) {
		return res.status(400).send(
			message({
				data: req.body,
				message: isRolesIdError.error.message,
				statusCode: 400,
			})
		);
	}

	const isRolesIdExist = await Roles.findById(req.body.rolesId);
	if (!isRolesIdExist) {
		return res.status(404).send(
			message({
				data: req.body,
				message: "Roles by given Id is not found!",
				statusCode: 404,
			})
		);
	}

	if ((req.query.roles as any).name == "SUPERVISOR") {
		if (isRolesIdExist.name != "STAFF") {
			return res.status(403).send(
				message({
					data: req.body,
					message: "You cannot update this user with the roles!",
					statusCode: 403,
				})
			);
		}
	}

	next();
};

const selfUpdateMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const isAnyError = validateUpdateProfile(_.omit(req.body));
	if (isAnyError.error) {
		return res.status(400).send(
			message({
				data: req.body,
				message: isAnyError.error.message,
				statusCode: 400,
			})
		);
	}

	next();
};

const userUpdateProfileMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const isAnyError = validateUpdateProfile(req.body);
	if (isAnyError.error) {
		return res.status(400).send(
			message({
				data: req.body,
				message: isAnyError.error.message,
				statusCode: 400,
			})
		);
	}

	next();
};

const userUpdateCredentialMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const isAnyError = validateUpdateCredential(req.body);
	if (isAnyError.error) {
		return res.status(400).send(
			message({
				data: req.body,
				message: isAnyError.error.message,
				statusCode: 400,
			})
		);
	}

	next();
};

export {
	usersValidatorMiddleware,
	userUpdateCredentialMiddleware,
	userUpdateProfileMiddleware,
	selfUpdateMiddleware,
};
