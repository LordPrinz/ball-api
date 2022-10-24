import express from "express";
import authController from "../controllers/authController";

const router = express.Router();

router.get("/", authController.isLoggedIn);

router.get("/tour/:slug", authController.isLoggedIn);
router.get("/signup", authController.isLoggedIn);
router.get("/login", authController.isLoggedIn);
router.get("/me", authController.protect);

router.get("/my-tours", authController.protect);

router.post("/submit-user-data", authController.protect);

export default router;
