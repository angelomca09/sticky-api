import repository from "../repositories/album.repository.js";

async function createAlbum(album) {
  return await repository.insertAlbum(album);
}
async function updateAlbum(album) {
  return await repository.updateAlbum(album);
}
async function getAlbum(albumId) {
  return await repository.getAlbum(albumId);
}
async function deleteAlbum(albumId) {
  return await repository.deleteAlbum(albumId);
}
async function existAlbum(albumId) {
  return await repository.existAlbum(albumId);
}

export default {
  createAlbum,
  updateAlbum,
  getAlbum,
  deleteAlbum,
  existAlbum,
};
