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

const uploadUserPhoto = upload.single("photo");

const resizeUserPhoto = catchAsync(
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

const getMe = (req: Request, res: Response, next: NextFunction) => {
	req.params.id = (req as any).user.id;
	next();
};

const updateMe = catchAsync(
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

const deleteMe = catchAsync(
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

const createUser = (req: Request, res: Response) => {
	res.status(500).json({
		status: "error",
		message: "This route is not yet defined! 😒 Please use /signup instead",
	});
};

const getAllUsers = factory.getAll(User);
const getUser = factory.getOne(User);

const updateUser = factory.patchOne(User);
const deleteUser = factory.deleteOne(User);

export default {
	getAllUsers,
	getUser,
	updateUser,
	deleteUser,
	updateMe,
	getMe,
	resizeUserPhoto,
	uploadUserPhoto,
	createUser,
	deleteMe,
};
