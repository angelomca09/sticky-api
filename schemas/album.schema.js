import mongoose from "mongoose";
import { User } from "./user.schema.js";

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

AlbumSchema.pre("deleteOne", async function (next) {
  try {
    const albumId = this.getQuery()["_id"];
    const users = await User.where({ albums: albumId });
    for (let user of users) {
      user.albums = user.albums.filter((s) => !s.equals(albumId));
      await user.save();
    }
    next();
  } catch (err) {
    next(err);
  }
});

const Album = mongoose.model("albums", AlbumSchema);

export { Album, AlbumSchema };
