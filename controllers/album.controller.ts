import express from "express";
import service from "../services/album.service";

async function createAlbum(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    let { name, pages, image } = req.body;
    if (!name || !pages || !image)
      throw new Error("Name, Pages and Image are Necessary!");
    res.send(await service.createAlbum(req.body));
    logger.info(`POST /album - ${JSON.stringify(req.body)}`);
  } catch (err) {
    next(err);
  }
}

async function addStickerToAlbum(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const { stickerId, albumId } = req.body;
    if (!stickerId || !albumId)
      throw new Error("StickerId and AlbumId are Necessary!");
    res.send(await service.addStickerToAlbum(stickerId, albumId));
    logger.info(`POST /album/addSticker - ${JSON.stringify(req.body)}`);
  } catch (err) {
    next(err);
  }
}

async function updateAlbum(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    let { id, name, pages, image } = req.body;
    if (!id || !name || !pages || !image)
      throw new Error("Id, Name, Pages and Image are Necessary!");
    res.send(await service.updateAlbum(req.body));
    logger.info(`PUT /album - ${JSON.stringify(req.body)}`);
  } catch (err) {
    next(err);
  }
}

async function getAlbum(req: express.Request, res: express.Response, next: express.NextFunction) {
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

async function getAlbums(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    res.send(await service.getAlbums());
    logger.info(`GET /album - ${JSON.stringify(req.params)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteAlbum(req: express.Request, res: express.Response, next: express.NextFunction) {
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
  addStickerToAlbum,
  updateAlbum,
  getAlbum,
  getAlbums,
  deleteAlbum,
};
