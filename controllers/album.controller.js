import service from "../services/album.service.js";

async function createAlbum(req, res, next) {
  try {
    let { name, pages } = req.body;
    if (!name || !pages) throw new Error("Name and Pages are Necessary!");
    res.send(await service.createAlbum(req.body));
    logger.info(`POST /album - ${JSON.stringify(req.body)}`);
  } catch (err) {
    next(err);
  }
}

async function updateAlbum(req, res, next) {
  try {
    let { id, name, pages } = req.body;
    if (!id || !name || !pages)
      throw new Error("Id, Name and Pages are Necessary!");
    res.send(await service.updateAlbum(req.body));
    logger.info(`PUT /album - ${JSON.stringify(req.body)}`);
  } catch (err) {
    next(err);
  }
}

async function getAlbum(req, res, next) {
  try {
    const { albumId } = req.params;
    if (!albumId) {
      throw new Error("Id is Necessary!");
    }
    res.send(await service.getAlbum(albumId));
    logger.info(`GET /album/<albumId> - ${JSON.stringify(req.params)}`);
  } catch (err) {
    next(err);
  }
}

async function getAlbums(req, res, next) {
  try {
    res.send(await service.getAlbums());
    logger.info(`GET /album - ${JSON.stringify(req.params)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteAlbum(req, res, next) {
  try {
    const { albumId } = req.params;
    if (!albumId) {
      throw new Error("Id is Necessary!");
    }
    res.send(await service.deleteAlbum(albumId));
    logger.info(`DELETE /album/<albumId> - ${JSON.stringify(req.params)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createAlbum,
  updateAlbum,
  getAlbum,
  getAlbums,
  deleteAlbum,
};
