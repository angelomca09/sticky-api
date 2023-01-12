import repository from "../repositories/sticker.repository.js";

async function createSticker(sticker) {
  return await repository.insertSticker(sticker);
}
async function updateSticker(sticker) {
  return await repository.updateSticker(sticker);
}
async function getSticker(stickerId) {
  return await repository.getSticker(stickerId);
}
async function deleteSticker(stickerId) {
  return await repository.deleteSticker(stickerId);
}
async function existSticker(stickerId) {
  return await repository.existSticker(stickerId);
}

export default {
  createSticker,
  updateSticker,
  getSticker,
  deleteSticker,
  existSticker,
};
