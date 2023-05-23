import express from "express";
import controller from "../controllers/album.controller";
import { authorize } from "../middlewares/auth.middleware";

const route = express.Router();

route.post("", authorize("admin"), controller.createAlbum);
route.post("/addSticker", authorize("admin"), controller.addStickerToAlbum);
route.put("", authorize("admin"), controller.updateAlbum);
route.get("", controller.getAlbums);
route.get("/:albumId", controller.getAlbum);
route.delete("/:albumId", authorize("admin"), controller.deleteAlbum);

export default route;
