import mongoose from "mongoose";
import { User } from "./user.schema";
import { Album } from "./album.schema";

const StickerSchema = new mongoose.Schema({
  name: String,
  number: Number,
  image: String,
});

StickerSchema.pre("deleteOne", async function (next) {
  try {
    const stickerId = this.getQuery()["_id"];
    const users = await User.where({ stickers: stickerId });
    for (let user of users) {
      user.stickers = user.stickers.filter((s) => !s.equals(stickerId));
      await user.save();
    }
    const albums = await Album.where({ stickers: stickerId });
    for (let album of albums) {
      album.stickers = album.stickers.filter((s) => !s.equals(stickerId));
      await album.save();
    }
    next();
  } catch (err: any) {
    next(err);
  }
});

const Sticker = mongoose.model("stickers", StickerSchema);

export { Sticker, StickerSchema };
