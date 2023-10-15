import { NextFunction, Request, Response } from "express";
import message from "../views/message";
import jwt from "jsonwebtoken"
import dotEnv from "dotenv";

const tokenVerificator = (req: Request, res: Response, next: NextFunction) => {
	if (!req.headers.authorization)
		return res.status(401).send(
			message({
				data: req.body,
				message: "Auth token is required",
				statusCode: 401,
			})
		);

	const token = req.headers.authorization;

	if (!token.startsWith("Bearer "))
		return res.status(401).send(
			message({
				data: req.body,
				message: "Auth token is supposed to be Bearer Token",
				statusCode: 401,
			})
		);

	const tokenJwt = token.split(" ")[1];

  dotEnv.config()

	jwt.verify(tokenJwt, process.env.JWTPRIVATEKEY!, (err, user) => {
		if (err) {
			return res.status(403).send(err.message);
		}

		req.query.user = user;
		next();
	});
};

export { tokenVerificator };
