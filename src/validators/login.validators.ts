import Joi from "joi";
import { TLogin } from "../types";

function validateLogin(owner: TLogin) {
	const schema = Joi.object({
		credential: Joi.string().min(1).max(255).trim().required(),
		password: Joi.string().min(8).max(255).trim().required(),
	});
	return schema.validate(owner);
}

export { validateLogin };
