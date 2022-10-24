import { NextFunction, Response, Request } from "express";
import multer from "multer";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import sharp from "sharp";
import factory from "./handleFactory";
import User from "../models/userModel";

const multerStorage = multer.memoryStorage();

const multerFilter = (
	req: any,
	file: Express.Multer.File,
	cb: (error: Error, filename: string | boolean) => void
) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb(new AppError("Not an image! Please upload only images.", 400), false);
	}
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsync(
	async (
		req: Request & { user: { id: string } },
		res: Response,
		next: NextFunction
	) => {
		if (!req.file) return next();

		req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

		await sharp(req.file.buffer)
			.resize(500, 500)
			.toFormat("jpeg")
			.jpeg({ quality: 90 })
			.toFile(`public/img/users/${req.file.filename}`);

		next();
	}
);

const filterObj = (obj: any, ...allowedFields: any) => {
	const newObj: any = {};
	Object.keys(obj).forEach((el) => {
		if (allowedFields.includes(el)) newObj[el] = obj[el];
	});

	return newObj;
};

exports.getMe = (req: Request, res: Response, next: NextFunction) => {
	req.params.id = (req as any).user.id;
	next();
};

exports.updateMe = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		if (req.body.password || req.body.passwordConfirm) {
			return next(
				new AppError(
					"This route is not for password updates. Please use /updateMyPassword.",
					400
				)
			);
		}

		const filteredBody = filterObj(req.body, "name", "email");
		if (req.file) (filteredBody as any).photo = req.file.filename;

		// 3) Update user document
		const updatedUser = await User.findByIdAndUpdate(
			(req as any).user.id,
			filteredBody,
			{
				new: true,
				runValidators: true,
			}
		);

		// sending responce to user
		res.status(200).json({
			status: "success",
			data: {
				user: updatedUser,
			},
		});
	}
);

exports.deleteMe = catchAsync(
	async (
		req: Request & { user: { id: string } },
		res: Response,
		next: NextFunction
	) => {
		await User.findByIdAndUpdate(req.user.id, { active: false });

		res.status(204).json({
			status: "success",
			data: null,
		});
	}
);

exports.createUser = (req: Request, res: Response) => {
	res.status(500).json({
		status: "error",
		message: "This route is not yet defined! 😒 Please use /signup instead",
	});
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);

exports.updateUser = factory.patchOne(User);
exports.deleteUser = factory.deleteOne(User);
