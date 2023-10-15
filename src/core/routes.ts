import { Express } from "express";
import * as routes from "../routes";

function coreRoutes(app: Express) {
	// Superintendent
	app.use("/v1/auth", routes.authRoutes);
	app.use("/v1/users", routes.userRoutes);
	app.use("/v1/documents", routes.documentsRoutes);
	app.use("/v1/comments", routes.commentsRoutes);
	app.use("/v1/master", routes.masterRoutes);

	// // Supervisor
	// app.use("/v2/auth", routes.authSupervisor);
	// app.use("/v2/users", routes.usersSupervisor);
	// app.use("/v2/documents", routes.documentsSupervisor);
	// app.use("/v2/comments", routes.commentsSupervisor);
	
	// // Staff
	// app.use("/v3/documents", routes.documentsStaff);
	// app.use("/v3/comments", routes.commentsStaff);

	// // // Public
	// app.use("/v4/documents", routes.documentsPublic);
	// app.use("/v4/auth", routes.authPublicRoutes);
	// app.use("/v4/master", routes.masterPublic);
	// app.use("/v4/cdn", routes.cdnPublic);

	
}

export { coreRoutes };
