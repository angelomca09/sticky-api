import express from "express";
import service from "../services/sticker.service";

async function createSticker(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    let { name, number } = req.body;
    if (!name || !number) throw new Error("Name and Number are Necessary!");
    res.send(await service.createSticker(req.body));
    logger.info(`POST /sticker - ${JSON.stringify(req.body)}`);
  } catch (err) {
    next(err);
  }
}

async function updateSticker(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    let { id, name, number } = req.body;
    if (!id || !name || !number)
      throw new Error("Id, Name and Number are Necessary!");
    res.send(await service.updateSticker(req.body));
    logger.info(`PUT /sticker - ${JSON.stringify(req.body)}`);
  } catch (err) {
    next(err);
  }
}

async function getSticker(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const { stickerId } = req.params;
    if (!stickerId) {
      throw new Error("Id is Necessary!");
    }
    res.send(await service.getSticker(stickerId));
    logger.info(`GET /sticker/<stickerId> - ${JSON.stringify(req.params)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteSticker(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const { stickerId } = req.params;
    if (!stickerId) {
      throw new Error("Id is Necessary!");
    }
    res.send(await service.deleteSticker(stickerId));
    logger.info(`DELETE /sticker/<stickerId> - ${JSON.stringify(req.params)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createSticker,
  updateSticker,
  getSticker,
  deleteSticker,
};
