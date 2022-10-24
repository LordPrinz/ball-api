import Player from "../models/playerModel";
import { createOne, deleteOne, getAll, getOne, patchOne } from "./handleFactory";
import multer from "multer";
import AppError from "../utils/AppError";
import { Request } from "express";

const multerStorage = multer.diskStorage({
	filename(req: Request, file, callback) {
		const ext = file.mimetype.split("/")[1];
		const filename = file.originalname;
		callback(null, `player-${req.body.name}-${req.body.surname}-${Date.now()}.${ext}`);
	},
});

const upload = multer({
	storage: multerStorage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype.startsWith("image")) {
			cb(null, true);
		} else {
			cb(
				new AppError("Not an image! Please upload only images", 400) as any,
				false
			);
		}
	},
});


export const getAllPlayers = getAll.bind(null, Player);
export const createPlayer = createOne.bind(null, Player);
export const getPlayer = getOne.bind(null, Player);
export const deletePlayer = deleteOne.bind(null, Player);
export const patchPlayer = patchOne.bind(null, Player);