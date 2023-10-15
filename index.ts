import "express-async-errors";
import dotEnv from "dotenv";
import {
	createApp,
	WebSocket,
	coreRoutes,
	app,
	http,
	port,
	connectDatabase,
	cronJob,
} from "./src/core";
import { initRoles, initSuperintentdent } from "./src/utils";
dotEnv.config();

createApp(app);

coreRoutes(app);
connectDatabase(process.env.MONGOURI!);
WebSocket();

initRoles();

initSuperintentdent();

cronJob();


http.listen(port, () =>
	console.log(`[server]: App is listening on port ${port}`)
);
export { http };
