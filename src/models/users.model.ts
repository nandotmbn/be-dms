/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		min: 0,
	},
	lastName: {
		type: String,
		min: 0,
	},
	fullName: {
		type: String,
		min: 0,
	},
	username: {
		type: String,
		max: 255,
		min: 3,
		unique: true,
	},
	email: {
		type: String,
		max: 255,
		min: 0,
		unique: true,
	},
	password: {
		type: String,
		max: 255,
		min: 0,
		unique: true,
	},
	roles: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Roles",
	},
	isArchived: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

const Users = mongoose.model("Users", UserSchema);

export { Users };

