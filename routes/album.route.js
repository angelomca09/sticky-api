import express from "express";
import controller from "../controllers/album.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const route = express.Router();

route.post("", authorize("admin"), controller.createAlbum);
route.put("", authorize("admin"), controller.updateAlbum);
route.get("", controller.getAlbums);
route.get("/:albumId", controller.getAlbum);
route.delete("/:albumId", authorize("admin"), controller.deleteAlbum);

export default route;
