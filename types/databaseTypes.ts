import { ObjectId } from "mongoose";

export enum Roles {
	Goalkeeper,
	"Centre-Backs",
	"Full-Backs",
	"Wing-Backs",
	"Defensive Midfielders",
	"Central Midfielders",
	"Attacking Midfielders",
	Wingers,
	"Inside Forwards",
	"Strikers",
}

export interface User {
	_id: ObjectId;
	name: string;
	email: string;
	image: string;
	password: string;
	passwordConfirm: string;
	__v: string;
}

export interface Player {
	_id: ObjectId;
	name: string;
	surname: string;
	age: number;
	role: Roles;
	club: string;
	image: string;
	__v: string;
}
