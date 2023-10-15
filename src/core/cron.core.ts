import mongoose from "mongoose";
import job from "node-cron";

function cronJob() {
	// job.schedule('* * * * *', () => {
	//   console.log('Running a task every minute');
	// });

	// console.log(mongoose.STATES.connected);

	console.log("[cron]: Cron Job Successfully Started!");
}

export { cronJob };
