/* eslint-disable @typescript-eslint/no-non-null-assertion */
import bcrypt from "bcrypt";
import dotEnv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Users } from "../../models";
import { validateLogin } from "../../validators";
import message from "../../views/message";

async function login(req: Request, res: Response) {
	const { error } = validateLogin(req.body);
	if (error)
		return res.status(400).send(
			message({
				statusCode: 400,
				message: error.message,
				data: "Bad Request",
			})
		);

	const isUserExist = await Users.findOne({
		$or: [{ email: req.body.credential }, { username: req.body.credential }],
	}).populate("roles", "name");

	if (!isUserExist) {
		return res.status(400).send(
			message({
				statusCode: 400,
				message: "Username or email is not valid",
				data: req.body,
			})
		);
	}

	const isValid = await bcrypt.compare(
		req.body.password,
		isUserExist.password!
	);

	if (!isValid)
		return res.status(403).send(
			message({
				statusCode: 403,
				message: "Invalid password",
				data: req.body,
			})
		);

	dotEnv.config();

	const jwtToken = jwt.sign(
		{
			_id: isUserExist._id,
		},
		process.env.JWTPRIVATEKEY!,
		{ expiresIn: "7d" }
	);

	const jwtTokenRefresh = jwt.sign(
		{
			_id: isUserExist._id,
		},
		process.env.JWTREFRESHPRIVATEKEY!
	);

	res.header("x-auth-token", jwtToken).send(
		message({
			statusCode: 200,
			message: "You have successfully logged in!",
			data: {
				data: isUserExist,
				access_token: jwtToken,
				refresh_token: jwtTokenRefresh,
			},
		})
	);
}

export { login };
