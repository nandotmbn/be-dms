import { Roles } from "../models";
import { ROLES } from "../static";

async function InitRoles(name: string) {
	const roles = await Roles.findOne({ name });
	if (roles) {
		return console.log("[roles]: Roles " + name + " had been registered");
	}

	const newRoles = new Roles({ name });
	const savedRoles = await newRoles.save();
	console.log(savedRoles.name + " has successfully registered");
}

function initRoles() {
	ROLES.forEach((value) => {
		InitRoles(value);
	});
}

export { initRoles };
