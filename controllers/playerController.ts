import Player from "../models/playerModel";
import { createOne, deleteOne, getAll, getOne, patchOne } from "./handleFactory";

export const getAllPlayers = getAll.bind(null, Player);
export const createPlayer = createOne.bind(null, Player);
export const getPlayer = getOne.bind(null, Player);
export const deletePlayer = deleteOne.bind(null, Player);
export const patchPlayer = patchOne.bind(null, Player);