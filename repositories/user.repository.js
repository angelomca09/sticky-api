import User from "../models/user.model.js";

async function insertUser(user) {
  try {
    return await User.create(user);
  } catch (error) {
    throw error;
  }
}

async function getUsers() {
  try {
    return await User.findAll();
  } catch (error) {
    throw error;
  }
}

async function getUser(user_id) {
  try {
    return await User.findByPk(user_id);
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(user_email) {
  try {
    return await User.findOne({ where: { user_email } });
  } catch (error) {
    throw error;
  }
}

async function updateUser(user) {
  try {
    await User.update(user, {
      where: {
        user_id: user.userId,
      },
    });
    return await getUser(user.userId);
  } catch (error) {
    throw error;
  }
}

async function deleteUser(user_id) {
  try {
    await User.destroy({
      where: {
        user_id,
      },
    });
  } catch (error) {
    throw error;
  }
}

export default {
  insertUser,
  getUsers,
  getUser,
  getUserByEmail,
  updateUser,
  deleteUser,
};
