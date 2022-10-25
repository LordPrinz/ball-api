import { NextFunction, Response, Request } from "express";
import catchAsync from "../utils/catchAsync";
import User from "./../models/userModel";

const signup = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const newUser = await User.create(req.body);

		res.status(201).json({
			status: "success",
			data: {
				user: newUser,
			},
		});
	}
);

export default {
	signup,
};
