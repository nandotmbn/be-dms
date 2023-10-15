import { Router } from "express";
import fs from "fs";

function routerWriter(
	router: Router,
	route: string,
	role: "Superintendent" | "Supervisor" | "Lecturer" | "Staff" | "Public"
) {
	fs.writeFile(`log/${role}.log`, "", () => {});
	router.stack.forEach(function (middleware) {
		fs.writeFile(
			`log/${role}.log`,
			middleware.route.stack[0].method.toUpperCase() +
				` ${route}` +
				middleware.route.path +
				"\r\n",
			{ flag: "a+" },
			(err) => {
				if (err) {
					console.error(err);
				}
			}
		);
	});
}
export { routerWriter };
