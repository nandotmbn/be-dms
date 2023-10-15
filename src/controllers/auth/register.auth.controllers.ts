import bcrypt from "bcrypt";
import { Request, Response } from "express";
import _ from "lodash";
import { Roles, Users } from "../../models";
import { validateRegister } from "../../validators";
import message from "../../views/message";

async function register(req: Request, res: Response) {
	const { error } = validateRegister(
		_.omit(req.body, ["rolesId"])
	);
	if (error)
		return res.status(400).send(
			message({
				statusCode: 400,
				message: error.message,
				data: "Bad Request",
			})
		);

	const isRolesIdRegistered = await Roles.findById(req.body.rolesId);
	if (!isRolesIdRegistered) {
		return res.status(404).send(
			message({
				statusCode: 404,
				message: "Roles with given id is not found",
				data: req.body,
			})
		);
	}

	const isUserExist = await Users.findOne({
		$or: [{ username: req.body.username }, { email: req.body.email }],
	});
	if (isUserExist) {
		return res.status(400).send(
			message({
				statusCode: 400,
				message: "User with given username or email had been registered",
				data: req.body,
			})
		);
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	const newUser = new Users({
		...req.body,
		fullName: `${req.body.firstName} ${req.body.lastName}`,
		roles: req.body.rolesId,
		password: hashedPassword,
		isActive: true,
	});

	const user = await newUser.save();

	res.status(201).send(
		message({
			statusCode: 201,
			message: "User successfully registered",
			data: user,
		})
	);
}

export { register };

