import { IAlbum } from "../interfaces/IAlbum";
import repository from "../repositories/album.repository";
import stickerRepository from "../repositories/sticker.repository";

async function createAlbum(album: IAlbum) {
  return await repository.insertAlbum(album);
}
async function addStickerToAlbum(stickerId: string, albumId: string) {
  if (await stickerRepository.existSticker(stickerId))
    return await repository.addStickerToAlbum(stickerId, albumId);
  else throw new Error("Sticker does not exist!");
}
async function updateAlbum(album: IAlbum) {
  return await repository.updateAlbum(album);
}
async function getAlbum(albumId: string) {
  return await repository.getAlbum(albumId);
}
async function getAlbums() {
  return await repository.getAlbums();
}
async function deleteAlbum(albumId: string) {
  return await repository.deleteAlbum(albumId);
}
async function existAlbum(albumId: string) {
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
