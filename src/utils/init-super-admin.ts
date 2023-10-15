import { Roles, Users } from "../models";
import dotEnv from "dotenv";
import bcrypt from "bcrypt";

async function InitSuperintentdent() {
	dotEnv.config();

	if (!process?.env?.PASSWORDSUPERADMIN && !process?.env?.SUPERADMIN) {
		throw new Error("Superintendent is not set!");
	}

	const superintendentId = await Roles.findOne({
		name: "SUPERINTENDENT",
	});

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(
		process?.env?.PASSWORDSUPERADMIN as string,
		salt
	);

	const superintendent = await Users.findOne({
		username: process.env.SUPERADMIN,
	});

	if (superintendent) {
		return console.log(
			"[superintendent]: " + superintendent?.username + " had been registered"
		);
	}

	const newSuperintentdent = new Users({
		username: process.env.SUPERADMIN,
		password: hashedPassword,
		email: "superintendent@dms.ac.id",
		firstName: "Superintendent",
		lastName: "DMS",
		fullName: "Superintendent DMS",
		roles: superintendentId?._id,
	});

	const savedSuperintentdent = await newSuperintentdent.save();
	
	console.log(
		"[super-admin]: " +
			savedSuperintentdent?.username +
			" has successfully registered"
	);
}

const initSuperintentdent = () => {
	setTimeout(() => {
		InitSuperintentdent();
	}, 1000);
};

export { initSuperintentdent };
