import repository from "../repositories/user.repository.js";
import stickerRepo from "../repositories/sticker.repository.js";
import albumRepo from "../repositories/album.repository.js";

async function createUser(user) {
  return await repository.insertUser(user);
}
async function updateUser(user) {
  return await repository.updateUser(user);
}
async function getUser(userId) {
  return await repository.getUser(userId);
}
async function getUserByUsername(username) {
  return await repository.getUserByUsername(username);
}
async function deleteUser(userId) {
  return await repository.deleteUser(userId);
}
async function addSticker(userId, stickerId) {
  if (await stickerRepo.existSticker(stickerId))
    return await repository.addSticker(userId, stickerId);
  else throw new Error("Sticker does not exist!");
}
async function deleteSticker(userId, stickerId) {
  if (await stickerRepo.existSticker(stickerId))
    return await repository.deleteSticker(userId, stickerId);
  else throw new Error("Sticker does not exist!");
}
async function addAlbum(userId, albumId) {
  if (await albumRepo.existAlbum(albumId))
    return await repository.addAlbum(userId, albumId);
  else throw new Error("Album does not exist!");
}
async function deleteAlbum(userId, albumId) {
  if (await albumRepo.existAlbum(albumId))
    return await repository.deleteAlbum(userId, albumId);
  else throw new Error("Album does not exist!");
}

export default {
  createUser,
  updateUser,
  getUser,
  getUserByUsername,
  deleteUser,
  addSticker,
  deleteSticker,
  addAlbum,
  deleteAlbum,
};
