import repository from "../repositories/sticker.repository";
import { ISticker } from "../interfaces/ISticker";

async function createSticker(sticker: ISticker) {
  return await repository.insertSticker(sticker);
}
async function updateSticker(sticker: ISticker) {
  return await repository.updateSticker(sticker);
}
async function getSticker(stickerId: string) {
  return await repository.getSticker(stickerId);
}
async function deleteSticker(stickerId: string) {
  return await repository.deleteSticker(stickerId);
}
async function existSticker(stickerId: string) {
  return await repository.existSticker(stickerId);
}

export default {
  createSticker,
  updateSticker,
  getSticker,
  deleteSticker,
  existSticker,
};
