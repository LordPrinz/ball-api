import catchAsync from "../utils/catchAsync";
import APIFeatures from "../utils/APIFeatures";
import type { Model } from "mongoose";
import type { Response, Request, NextFunction } from "express";
import { cloudinaryConfig, uploader } from "../cloudinaryConfig";
import validateId from "../utils/validateId";

const getAll = (Model: Model<any>) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		let filter = {};
		if (req.params.reportId) {
			filter = { report: req.params.reportId };
		}

		const features = new APIFeatures(Model.find(filter), req.query as any);

		const doc = await features.query;

		res.status(200).json({
			status: "success",
			results: doc.length,
			data: doc,
		});
	});

const getOne = (Model: Model<any>) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;

		if (!validateId(id)) {
			return res.status(422).json({
				status: "fail",
				results: 0,
				data: "Wrong ID",
			});
		}

		const features = new APIFeatures(Model.find({ _id: id }), req.query as any);

		const doc = await features.query;

		res.status(200).json({
			status: "success",
			results: doc.length,
			data: doc[0],
		});
	});

const deleteOne = (Model: Model<any>) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;

		if (!validateId(id)) {
			return res.status(422).json({
				status: "fail",
				results: 0,
				data: "Wrong ID",
			});
		}

		await Model.findByIdAndRemove(id);

		res.status(204).json({
			status: "success",
			data: null,
		});
	});

const patchOne = (Model: Model<any>) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;

		if (!validateId(id)) {
			return res.status(422).json({
				status: "fail",
				results: 0,
				data: "Wrong ID",
			});
		}

		let uploadRes: any;
		const imagePath = (req as any).file?.path;

		if (imagePath) {
			const file = imagePath.replace("file:///", "");
			cloudinaryConfig;
			uploadRes = await uploader.upload(file).catch((err) => console.log(err));
		}

		let data: any =
			uploadRes !== undefined
				? { ...req.body, image: (uploadRes as any)?.secure_url }
				: { ...req.body };

		const doc = await Model.findOneAndUpdate({ _id: id }, data, {
			upsert: true,
		});

		res.status(200).json({
			status: "success",
			data: {
				data: doc[0],
			},
		});
	});

const createOne = (Model: Model<any>) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		let uploadRes: any;
		const imagePath = (req as any).file?.path;

		if (imagePath) {
			const file = imagePath.replace("file:///", "");
			cloudinaryConfig;
			uploadRes = await uploader.upload(file).catch((err) => console.log(err));
		}

		let data: any =
			uploadRes !== undefined
				? { ...req.body, image: (uploadRes as any)?.secure_url }
				: { ...req.body };

		const doc = await Model.insertMany([data]);

		res.status(201).json({
			status: "success",
			data: {
				data: doc,
			},
		});
	});

export default {
	getAll,
	getOne,
	createOne,
	patchOne,
	deleteOne,
};
