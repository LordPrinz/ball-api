import express from "express";
import playerController from "../controllers/playerController";

const router = express.Router();

router
	.route("/")
	.get(playerController.getAllPlayers)
	.post(playerController.uploadPlayerImage, playerController.createPlayer);

router
	.route("/:id")
	.get(playerController.getPlayer)
	.delete(playerController.deletePlayer)
	.patch(playerController.uploadPlayerImage, playerController.patchPlayer);

export default router;
