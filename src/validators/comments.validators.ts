import Joi from "joi";

/* eslint-disable @typescript-eslint/no-explicit-any */
function validateComments(informations: any) {
	const schema = Joi.object({
		content: Joi.string().min(1).trim().required(),
		isArchived: Joi.boolean(),
	});
	return schema.validate(informations);
}

export { validateComments };
