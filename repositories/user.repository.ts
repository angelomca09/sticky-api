import { Types } from "mongoose";
import { connect } from "../db/mongoose.db";
import { IUser } from "../interfaces/IUser";
import { User } from "../schemas/user.schema";

async function insertUser(values: IUser) {
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

async function updateUser(values: IUser) {
  try {
    await connect();
    let user = await User.findById(values.id);

    if (!user) throw new Error(`User ${values.id} does not exist!`)

    user.username = values.username;
    user.password = values.password;
    user.email = values.email;
    user.telephone = values.telephone;
    user.albums = values.albums ?? [];
    user.stickers = values.stickers ?? [];
    await user.save();
  } catch (error) {
    throw error;
  }
}

async function getUser(userId: string) {
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

async function getUserByUsername(username: string) {
  try {
    if (username === "admin") return "";
    await connect();
    const user = await User.findOne({ username })
      .populate("albums")
      .populate("stickers");

    if (!user) throw new Error(`User '${username}' does not exist!`)

    return user
  } catch (error) {
    throw error;
  }
}

async function getUserPasswordByUsername(username: string) {
  try {
    if (username === "admin") return "";
    await connect();
    const user = await User.findOne({ username }).select("+password");
    if (!user) throw new Error(`User '${username}' does not exist!`)
    return user.password;
  } catch (error) {
    throw error;
  }
}

async function existUser(username: string) {
  try {
    await connect();
    return await User.exists({ username });
  } catch (error) {
    throw error;
  }
}

async function deleteUser(userId: string) {
  try {
    await connect();
    const query = await User.deleteOne({ _id: userId });
    return !!query.deletedCount;
  } catch (error) {
    throw error;
  }
}

async function addSticker(userId: string, stickerId: string) {
  try {
    await connect();
    const user = await User.findById(userId);

    if (!user) throw new Error(`User ${userId} does not exist!`)

    user.stickers.push(new Types.ObjectId(stickerId));
    await user.save();
    return user.stickers;
  } catch (error) {
    throw error;
  }
}

async function deleteSticker(userId: string, stickerId: string) {
  try {
    await connect();
    const user = await User.findById(userId);

    if (!user) throw new Error(`User ${userId} does not exist!`)

    const index = user.stickers.findIndex((id) => id.equals(stickerId));
    user.stickers = user.stickers.filter((_, i) => i !== index);
    await user.save();
    return user.stickers;
  } catch (error) {
    throw error;
  }
}
async function addAlbum(userId: string, albumId: string) {
  try {
    await connect();
    const user = await User.findById(userId);

    if (!user) throw new Error(`User ${userId} does not exist!`)

    user.albums.push(new Types.ObjectId(albumId));
    await user.save();
    return user.albums;
  } catch (error) {
    throw error;
  }
}

async function deleteAlbum(userId: string, albumId: string) {
  try {
    await connect();
    const user = await User.findById(userId);

    if (!user) throw new Error(`User ${userId} does not exist!`)

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
