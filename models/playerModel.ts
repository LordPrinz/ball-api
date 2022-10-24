import mongoose from "mongoose"

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    club: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
});

const PlayerModel = mongoose.model("Player", playerSchema);

export default PlayerModel