import express from "express";
import teamController from "../controllers/teamController";

const router = express.Router();

router
  .route("/")
  .get(teamController.getAllTeams)
  .post(teamController.createTeam);
router
  .route("/:id")
  .get(teamController.getTeam)
  .delete(teamController.deleteTeam)
  .patch(teamController.patchTeam);

export default router;
