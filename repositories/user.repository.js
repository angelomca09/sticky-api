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
    await connect();
    const user = await User.findOne({ username });
    return user;
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

export default {
  insertUser,
  getUser,
  getUserByUsername,
  existUser,
  updateUser,
  deleteUser,
};
