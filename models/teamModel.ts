import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
	players: { type: [String] },
});

const TeamSchema = mongoose.model("Team", teamSchema);

export default TeamSchema;
