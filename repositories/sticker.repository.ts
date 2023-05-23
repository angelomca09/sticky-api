import { connect } from "../db/mongoose.db";
import { ISticker } from "../interfaces/ISticker";
import { Sticker } from "../schemas/sticker.schema";

async function insertSticker(values: ISticker) {
  try {
    await connect();
    const sticker = new Sticker(values);
    await sticker.save();
    return sticker;
  } catch (error) {
    throw error;
  }
}

async function updateSticker(values: ISticker) {
  try {
    await connect();
    let sticker = await Sticker.findById(values.id);

    if (!sticker) throw new Error(`Sticker ${values.id} does not exist!`)

    sticker.name = values.name;
    sticker.number = values.number;
    await sticker.save();
    return sticker;
  } catch (error) {
    throw error;
  }
}

async function getSticker(stickerId: string) {
  try {
    await connect();
    const sticker = await Sticker.findById(stickerId);
    return sticker;
  } catch (error) {
    throw error;
  }
}

async function deleteSticker(stickerId: string) {
  try {
    await connect();
    const query = await Sticker.deleteOne({ _id: stickerId });
    return !!query.deletedCount;
  } catch (error) {
    throw error;
  }
}

async function existSticker(stickerId: string) {
  try {
    await connect();
    return await Sticker.exists({ _id: stickerId });
  } catch (error) {
    throw error;
  }
}

export default {
  insertSticker,
  updateSticker,
  getSticker,
  deleteSticker,
  existSticker,
};
