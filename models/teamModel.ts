import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
	name: String,
	players: { type: [String] },
});

const TeamSchema = mongoose.model("Team", teamSchema);

export default TeamSchema;
