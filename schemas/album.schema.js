import mongoose from "mongoose";
import StickerSchema from "./sticker.schema.js";

const AlbumSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    pages: Number,
    stickers: [StickerSchema],
  },
  { collection: "albums" }
);

export default AlbumSchema;
