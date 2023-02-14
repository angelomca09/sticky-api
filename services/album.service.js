import repository from "../repositories/album.repository.js";
import stickerRepository from "../repositories/sticker.repository.js";

async function createAlbum(album) {
  return await repository.insertAlbum(album);
}
async function addStickerToAlbum(stickerId, albumId) {
  if (await stickerRepository.existSticker(stickerId))
    return await repository.addStickerToAlbum(stickerId, albumId);
  else throw new Error("Sticker does not exist!");
}
async function updateAlbum(album) {
  return await repository.updateAlbum(album);
}
async function getAlbum(albumId) {
  return await repository.getAlbum(albumId);
}
async function getAlbums() {
  return await repository.getAlbums();
}
async function deleteAlbum(albumId) {
  return await repository.deleteAlbum(albumId);
}
async function existAlbum(albumId) {
  return await repository.existAlbum(albumId);
}

export default {
  createAlbum,
  addStickerToAlbum,
  updateAlbum,
  getAlbum,
  getAlbums,
  deleteAlbum,
  existAlbum,
};
