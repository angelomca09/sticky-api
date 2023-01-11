import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema({
  name: String,
  pages: Number,
  image: String,
  stickers: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "stickers",
    },
  ],
});

const Album = mongoose.model("albums", AlbumSchema);

export { Album, AlbumSchema };
