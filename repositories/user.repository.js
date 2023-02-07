import { connect } from "../db/mongoose.db.js";
import { User } from "../schemas/user.schema.js";

async function insertUser(values) {
  try {
    await connect();
    const user = new User(values);
    user.albums = [];
    user.stickers = [];
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUser(values) {
  try {
    await connect();
    let user = await User.findById(values.id);
    user.username = values.username;
    user.password = values.password;
    user.email = values.email;
    user.telephone = values.telephone;
    user.albums = values.albums;
    user.stickers = values.stickers;
    await user.save();
  } catch (error) {
    throw error;
  }
}

async function getUser(userId) {
  try {
    await connect();
    const user = await User.findById(userId)
      .populate("albums")
      .populate("stickers");
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    if (username === "admin") return "";
    await connect();
    const user = await User.findOne({ username });
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserPasswordByUsername(username) {
  try {
    if (username === "admin") return "";
    await connect();
    const user = await User.findOne({ username }).select("+password");
    return user.password;
  } catch (error) {
    throw error;
  }
}

async function existUser(username) {
  try {
    await connect();
    return await User.exists({ username });
  } catch (error) {
    throw error;
  }
}

async function deleteUser(userId) {
  try {
    await connect();
    const query = await User.deleteOne({ _id: userId });
    return !!query.deletedCount;
  } catch (error) {
    throw error;
  }
}

async function addSticker(userId, stickerId) {
  try {
    await connect();
    const user = await User.findById(userId);
    user.stickers.push(stickerId);
    await user.save();
    return user.stickers;
  } catch (error) {
    throw error;
  }
}

async function deleteSticker(userId, stickerId) {
  try {
    await connect();
    const user = await User.findById(userId);
    const index = user.stickers.findIndex((id) => id.equals(stickerId));
    user.stickers = user.stickers.filter((_, i) => i !== index);
    await user.save();
    return user.stickers;
  } catch (error) {
    throw error;
  }
}
async function addAlbum(userId, albumId) {
  try {
    await connect();
    const user = await User.findById(userId);
    user.albums.push(albumId);
    await user.save();
    return user.albums;
  } catch (error) {
    throw error;
  }
}

async function deleteAlbum(userId, albumId) {
  try {
    await connect();
    const user = await User.findById(userId);
    const index = user.albums.findIndex((id) => id.equals(albumId));
    user.albums = user.albums.filter((_, i) => i !== index);
    await user.save();
    return user.albums;
  } catch (error) {
    throw error;
  }
}

export default {
  insertUser,
  getUser,
  getUserByUsername,
  getUserPasswordByUsername,
  existUser,
  updateUser,
  deleteUser,
  addSticker,
  deleteSticker,
  addAlbum,
  deleteAlbum,
};
