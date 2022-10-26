import Player from "../models/playerModel";
import factory from "./handleFactory";
import multer from "multer";
import AppError from "../utils/AppError";

const multerStorage = multer.diskStorage({
  filename(req, file, callback) {
    const ext = file.mimetype.split("/")[1];
    callback(
      null,
      `player-${req.body.name}-${req.body.surname}-${Date.now()}.${ext}`
    );
  },
});

const upload = multer({
  storage: multerStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(
        new AppError("Not an image! Please upload only images", 400) as any,
        false
      );
    }
  },
});

export default {
  uploadPlayerImage: upload.single("image"),
  getAllPlayers: factory.getAll(Player),
  createPlayer: factory.createOne(Player),
  getPlayer: factory.getOne(Player),
  deletePlayer: factory.deleteOne(Player),
  patchPlayer: factory.patchOne(Player),
};
