import Team from "../models/teamModel";
import factory from "./handleFactory";

export default {
  getAllTeams: factory.getAll(Team),
  createTeam: factory.createOne(Team),
  getTeam: factory.getOne(Team),
  deleteTeam: factory.deleteOne(Team),
  patchTeam: factory.patchOne(Team),
};
