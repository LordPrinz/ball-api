import { Response, Request } from "express";

const getAllUsers = (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
const getUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
const createUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
const updateUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
const deleteUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

export default {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
