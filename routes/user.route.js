import express from "express";
import controller from "../controllers/user.controller.js";
import {
  authorize,
  authorizeUserByBody,
} from "../middlewares/auth.middleware.js";

const route = express.Router();

route.post("", authorize("admin"), controller.createUser);
route.put("", authorize("admin"), controller.updateUser);
route.post("/sticker", authorizeUserByBody(), controller.addSticker);
route.delete("/sticker", authorizeUserByBody(), controller.deleteSticker);
route.post("/album", authorizeUserByBody(), controller.addAlbum);
route.delete("/album", authorizeUserByBody(), controller.deleteAlbum);
route.get("/:userId", controller.getUser);
route.delete("/:userId", authorize("admin"), controller.deleteUser);

export default route;
