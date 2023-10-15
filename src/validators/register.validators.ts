/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from "joi";

function validateRegister(owner: any) {
	const schema = Joi.object({
		firstName: Joi.string().min(1).max(255).trim().required(),
		lastName: Joi.string().min(1).max(255).trim().required(),
		username: Joi.string().min(5).max(255).trim().required(),
		email: Joi.string().min(1).max(255).email().trim().required(),
		password: Joi.string().min(8).max(255).trim().required(),
	});
	return schema.validate(owner);
}

export { validateRegister };
