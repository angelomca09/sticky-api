import { connect } from "../db/mongoose.db.js";
import { Sticker } from "../schemas/sticker.schema.js";

async function insertSticker(values) {
  try {
    await connect();
    const sticker = new Sticker(values);
    await sticker.save();
    return sticker;
  } catch (error) {
    throw error;
  }
}

async function updateSticker(values) {
  try {
    await connect();
    let sticker = await Sticker.findById(values.id);
    sticker.name = values.name;
    sticker.number = values.number;
    await sticker.save();
    return sticker;
  } catch (error) {
    throw error;
  }
}

async function getSticker(stickerId) {
  try {
    await connect();
    const sticker = await Sticker.findById(stickerId);
    return sticker;
  } catch (error) {
    throw error;
  }
}

async function deleteSticker(stickerId) {
  try {
    await connect();
    const query = await Sticker.deleteOne({ _id: stickerId });
    return !!query.deletedCount;
  } catch (error) {
    throw error;
  }
}

export default {
  insertSticker,
  updateSticker,
  getSticker,
  deleteSticker,
};
