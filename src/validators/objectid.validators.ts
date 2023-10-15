/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from "joi";
import { joiObjectId } from "ts-joi-objectid";

interface ObjectId {
	id: string;
}

const MyJoi = joiObjectId(Joi);

function objectIdValidator(id: string) {
	const schema = Joi.object<ObjectId>({
		id: MyJoi().required(),
	});
	return schema.validate({ id });
}

export { objectIdValidator };
