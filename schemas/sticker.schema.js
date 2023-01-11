import mongoose from "mongoose";

const StickerSchema = new mongoose.Schema({
  name: String,
  number: Number,
  image: String,
});

const Sticker = mongoose.model("stickers", StickerSchema);

export { Sticker, StickerSchema };
