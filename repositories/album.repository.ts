import { Types } from "mongoose";
import { connect } from "../db/mongoose.db";
import { IAlbum } from "../interfaces/IAlbum";
import { Album } from "../schemas/album.schema";

async function insertAlbum(values: IAlbum) {
  try {
    await connect();
    const album = new Album(values);
    await album.save();
    return album;
  } catch (error) {
    throw error;
  }
}

async function addStickerToAlbum(stickerId: string, albumId: string) {
  try {
    await connect();
    const album = await Album.findById(albumId);
    if (!album) throw new Error(`Album ${albumId} does not exist!`)

    if (!album.stickers.map(s => s._id.toString()).includes(stickerId)) {
      album.stickers.push(new Types.ObjectId(stickerId));
    }

    await album.save();
    return album;
  } catch (error) {
    throw error;
  }
}

async function updateAlbum(values: IAlbum) {
  try {
    await connect();
    let album = await Album.findById(values.id);
    if (!album) throw new Error(`Album ${values.id} does not exist!`)

    album.name = values.name;
    album.pages = values.pages;
    album.stickers = values.stickers ?? [];
    album.image = values.image;
    await album.save();
    return album;
  } catch (error) {
    throw error;
  }
}

async function getAlbum(albumId: string) {
  try {
    await connect();
    const album = await Album.findById(albumId).populate("stickers");
    return album;
  } catch (error) {
    throw error;
  }
}

async function getAlbums() {
  try {
    console.log("Caiu no repo");
    await connect();
    const albums = await Album.find().populate("stickers");
    return albums;
  } catch (error) {
    throw error;
  }
}

async function deleteAlbum(albumId: string) {
  try {
    await connect();
    const query = await Album.deleteOne({ _id: albumId });
    return !!query.deletedCount;
  } catch (error) {
    throw error;
  }
}

async function existAlbum(albumId: string) {
  try {
    await connect();
    return await Album.exists({ _id: albumId });
  } catch (error) {
    throw error;
  }
}

export default {
  insertAlbum,
  addStickerToAlbum,
  updateAlbum,
  getAlbum,
  getAlbums,
  deleteAlbum,
  existAlbum,
};
