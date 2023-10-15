import { NextFunction, Request, Response } from "express";
import { Users } from "../../models";

interface IUser {
	_id: string;
}

const staffChecker = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user: IUser = req?.query?.user as any;

	const myProfile = await Users.findById(user._id)
		.select("roles _id responsibleType responsibleTo")
		.populate("roles", "name");

	req.query.roles = myProfile?.roles as any;

	if (!myProfile) {
		return res.status(403).send("You're not registered");
	}

	const roles: any = myProfile?.roles as any;

	if (roles?.name != "STAFF") {
		return res.status(403).send("You're not Staff");
	}

	next();
};

export { staffChecker };
