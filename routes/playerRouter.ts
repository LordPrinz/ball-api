import express from "express";
import { createPlayer, deletePlayer, getAllPlayers, getPlayer, patchPlayer, uploadPlayerImage } from "../controllers/playerController";

const router = express.Router();

router.route("/").get(getAllPlayers).post(uploadPlayerImage,createPlayer);

router.route("/:id").get(getPlayer).delete(deletePlayer).patch(patchPlayer);

export default router;