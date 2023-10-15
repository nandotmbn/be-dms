import Joi from "joi";

/* eslint-disable @typescript-eslint/no-explicit-any */
function validateDocuments(informations: any) {
	const schema = Joi.object({
		title: Joi.string()
			.regex(/^\w+(?:\s+\w+)*$/)
			.min(1)
			.trim()
			.required(),
		content: Joi.string().min(1).trim().required(),
		status: Joi.string()
			.valid("PENDING", "REVIEWED", "REVISION", "REUPLOAD", "APPROVED")
			.trim(),
		isArchived: Joi.boolean(),
	});
	return schema.validate(informations);
}

export { validateDocuments };
