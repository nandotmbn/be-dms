/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from "express";
import { Roles, Users } from "../../models";
import { ROLES } from "../../static";
import message from "../../views/message";

interface IUser {
	_id: string;
}

async function getAllUsers(req: Request, res: Response) {
	const limit: number = parseInt(req.query.limit as string) || 1;
	const page: number = parseInt(req.query.page as string) || 1;
	const name: string = (req.query.name as string) || "";
	const role: string = (req.query.role as string) || "";
	const isArchived: boolean = req.query.isArchived == "true" ? true : false;

	const queryRoles: any = req.query.roles as any;
	const queryRolesName = queryRoles.name;

	let idNe: any[] = [];

	switch (queryRolesName) {
		case "SUPERINTENDENT":
			if (req.query.role == "SUPERINTENDENT") {
				return res.status(401).send(
					message({
						data: req.query,
						message: "You cannot retrieve yourself!",
						statusCode: 401,
					})
				);
			}

			let undeliverRole = ["SUPERINTENDENT"];

			if (req.query.role) {
				undeliverRole = ROLES.filter((ROLE) => ROLE != req.query.role);
			}

			const superAdminNe = await Roles.find({
				name: { $in: undeliverRole },
			});
			idNe = superAdminNe.map((value) => {
				return value._id
			});
			break;

		case "SUPERVISOR":
			if (req.query.role == "SUPERINTENDENT" || req.query.role == "SUPERVISOR") {
				return res.status(401).send(
					message({
						data: req.query,
						message: "You cannot retrieve admin level!",
						statusCode: 401,
					})
				);
			}

			let undeliverRoleAdmin = ["SUPERINTENDENT", "SUPERVISOR"];

			if (req.query.role) {
				undeliverRoleAdmin = ROLES.filter((ROLE) => ROLE != req.query.role);
			}

			const adminNe = await Roles.find({
				name: { $in: undeliverRoleAdmin },
			});
			idNe = adminNe.map((value) => {
				return value._id
			});
			break;

		default:
			break;
	}

	if (role) {
		const isRolesExist = await Roles.findOne({ name: role });
		if (!isRolesExist) {
			return res.status(404).send(
				message({
					data: req.query,
					message: "Roles with given Id is not found",
					statusCode: 404,
				})
			);
		}
	}

	const rolesIdQuery = { roles: { $nin: idNe }, isArchived };

	const users = await Users.find({
		$or: [
			{ firstName: { $regex: new RegExp(name, "i") }, ...rolesIdQuery },
			{ lastName: { $regex: new RegExp(name, "i") }, ...rolesIdQuery },
			{ fullName: { $regex: new RegExp(name, "i") }, ...rolesIdQuery },
		],
		isArchived,
	})
		.populate({
			path: "roles",
			select: "name",
		})
		.select("-password -createdAt -updatedAt -__v -isArchived")
		.limit(limit || 1 * 1)
		.skip((page - 1) * limit)
		.sort("firstName")
		.exec();

	return res.send(message({
		statusCode: 200,
		message: "Users are successfully retrieved!",
		data: users,
	}));
}

export { getAllUsers };

