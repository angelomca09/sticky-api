import express from "express";
import controller from "../controllers/sticker.controller.js";

const route = express.Router();

route.post("", controller.createSticker);
route.put("", controller.updateSticker);
route.get("/:stickerId", controller.getSticker);
route.delete("/:stickerId", controller.deleteSticker);

export default route;
