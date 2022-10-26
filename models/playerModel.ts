import mongoose from "mongoose";

const roles = [
  "	Goalkeeper",
  "Centre-Backs",
  "Full-Backs",
  "Wing-Backs",
  "Defensive Midfielders",
  "Central Midfielders",
  "Attacking Midfielders",
  "Wingers",
  "Inside Forwards",
  "Strikers",
];

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: roles,
    required: [
      true,
      `Provide valid role. Available roles: ${roles.join(", ")}`,
    ],
  },
  club: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const PlayerModel = mongoose.model("Player", playerSchema);

export default PlayerModel;
