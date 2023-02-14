import { connect } from "../db/mongoose.db.js";
import { Album } from "../schemas/album.schema.js";

async function insertAlbum(values) {
  try {
    await connect();
    const album = new Album(values);
    await album.save();
    return album;
  } catch (error) {
    throw error;
  }
}

async function addStickerToAlbum(stickerId, albumId) {
  try {
    await connect();
    const album = await Album.findById(albumId);
    if (!album.stickers.includes(stickerId)) album.stickers.push(stickerId);
    await album.save();
    return album;
  } catch (error) {
    throw error;
  }
}

async function updateAlbum(values) {
  try {
    await connect();
    let album = await Album.findById(values.id);
    album.name = values.name;
    album.pages = values.pages;
    album.stickers = values.stickers;
    await album.save();
    return album;
  } catch (error) {
    throw error;
  }
}

async function getAlbum(albumId) {
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
    await connect();
    const albums = await Album.find().populate("stickers");
    return albums;
  } catch (error) {
    throw error;
  }
}

async function deleteAlbum(albumId) {
  try {
    await connect();
    const query = await Album.deleteOne({ _id: albumId });
    return !!query.deletedCount;
  } catch (error) {
    throw error;
  }
}

async function existAlbum(albumId) {
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
