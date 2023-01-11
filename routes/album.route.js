import express from "express";
import controller from "../controllers/album.controller.js";

const route = express.Router();

route.post("", controller.createAlbum);
route.put("", controller.updateAlbum);
route.get("/:albumId", controller.getAlbum);
route.delete("/:albumId", controller.deleteAlbum);

export default route;
