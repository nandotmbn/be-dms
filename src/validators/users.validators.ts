/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from "joi";

function validateUpdateByAdmin(object: any) {
	const schema = Joi.object({
		firstName: Joi.string()
			.regex(/^\w+(?:\s+\w+)*$/)
			.min(1)
			.max(255)
			.trim()
			.required(),
		lastName: Joi.string()
			.regex(/^\w+(?:\s+\w+)*$/)
			.min(1)
			.max(255)
			.trim()
			.required(),
		isArchived: Joi.boolean().required(),
	});
	return schema.validate(object);
}

function validateUpdateProfile(owner: any) {
	const schema = Joi.object({
		firstName: Joi.string()
			.regex(/^\w+(?:\s+\w+)*$/)
			.min(1)
			.max(255)
			.trim()
			.required(),
		lastName: Joi.string()
			.regex(/^\w+(?:\s+\w+)*$/)
			.min(1)
			.max(255)
			.trim()
			.required(),
	});
	return schema.validate(owner);
}

function validateUpdateCredential(owner: any) {
	const schema = Joi.object({
		username: Joi.string().min(3).max(255).trim().required(),
		email: Joi.string().min(1).max(255).email().trim().required(),
		password: Joi.string().min(8).max(255).trim().required(),
		oldPassword: Joi.string().min(8).max(255).trim().required(),
	});
	return schema.validate(owner);
}

export {
	validateUpdateByAdmin,
	validateUpdateCredential,
	validateUpdateProfile
};
