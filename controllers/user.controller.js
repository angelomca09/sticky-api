import service from "../services/user.service.js";

async function createUser(req, res, next) {
  try {
    const { username, email, telephone, password } = req.body;
    if (!username || !email || !telephone || !password) {
      throw new Error("Username, Email, Telephone and Password are necessary!");
    }
    res.send(await service.createUser(req.body));
    logger.info(`POST /user - ${JSON.stringify(req.body)}`);
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const { id, username, email, telephone, password } = req.body;
    if (!id || !username || !email || !telephone || !password) {
      throw new Error(
        "Id, Username, Email, Telephone and Password are necessary!"
      );
    }
    res.send(await service.updateUser(req.body));
    logger.info(`PUT /user - ${JSON.stringify(req.body)}`);
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw new Error("Id is Necessary!");
    }
    res.send(await service.getUser(userId));
    logger.info(`GET /user/<userId> - ${JSON.stringify(req.params)}`);
  } catch (err) {
    next(err);
  }
}

async function getUserByUsername(req, res, next) {
  try {
    const { username } = req.params;
    if (!username) {
      throw new Error("username is Necessary!");
    }
    res.send(await service.getUserByUsername(username));
    logger.info(`GET /user/<username> - ${JSON.stringify(req.params)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw new Error("Id is Necessary!");
    }
    res.send(await service.deleteUser(userId));
    logger.info(`DELETE /user/<userId> - ${JSON.stringify(req.params)}`);
  } catch (err) {
    next(err);
  }
}

async function addSticker(req, res, next) {
  try {
    const { userId, stickerId } = req.body;
    if (!userId || !stickerId) {
      throw new Error("UserId and StickerId are Necessary!");
    }
    res.send(await service.addSticker(userId, stickerId));
    logger.info(`POST /user/addSticker- ${JSON.stringify(req.params)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteSticker(req, res, next) {
  try {
    const { userId, stickerId } = req.body;
    if (!userId || !stickerId) {
      throw new Error("UserId and StickerId are Necessary!");
    }
    res.send(await service.deleteSticker(userId, stickerId));
    logger.info(`DELETE /user/deleteSticker - ${JSON.stringify(req.body)}`);
  } catch (err) {
    next(err);
  }
}

async function addAlbum(req, res, next) {
  try {
    const { userId, albumId } = req.body;
    if (!userId || !albumId) {
      throw new Error("UserId and AlbumId are Necessary!");
    }
    res.send(await service.addAlbum(userId, albumId));
    logger.info(`POST /user/addAlbum- ${JSON.stringify(req.params)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteAlbum(req, res, next) {
  try {
    const { userId, albumId } = req.body;
    if (!userId || !albumId) {
      throw new Error("UserId and AlbumId are Necessary!");
    }
    res.send(await service.deleteAlbum(userId, albumId));
    logger.info(`DELETE /user/deleteAlbum - ${JSON.stringify(req.body)}`);
  } catch (err) {
    next(err);
  }
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
