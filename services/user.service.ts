import repository from "../repositories/user.repository";
import stickerRepo from "../repositories/sticker.repository";
import albumRepo from "../repositories/album.repository";
import { IUser } from "../interfaces/IUser";

async function createUser(user: IUser) {
  return await repository.insertUser(user);
}
async function updateUser(user: IUser) {
  return await repository.updateUser(user);
}
async function getUser(userId: string) {
  return await repository.getUser(userId);
}
async function getUserByUsername(username: string) {
  return await repository.getUserByUsername(username);
}
async function deleteUser(userId: string) {
  return await repository.deleteUser(userId);
}
async function addSticker(userId: string, stickerId: string) {
  if (await stickerRepo.existSticker(stickerId))
    return await repository.addSticker(userId, stickerId);
  else throw new Error("Sticker does not exist!");
}
async function deleteSticker(userId: string, stickerId: string) {
  if (await stickerRepo.existSticker(stickerId))
    return await repository.deleteSticker(userId, stickerId);
  else throw new Error("Sticker does not exist!");
}
async function addAlbum(userId: string, albumId: string) {
  if (await albumRepo.existAlbum(albumId))
    return await repository.addAlbum(userId, albumId);
  else throw new Error("Album does not exist!");
}
async function deleteAlbum(userId: string, albumId: string) {
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
