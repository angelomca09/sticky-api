import express from "express";
import controller from "../controllers/sticker.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const route = express.Router();

route.post("", authorize("admin"), controller.createSticker);
route.put("", authorize("admin"), controller.updateSticker);
route.get("/:stickerId", controller.getSticker);
route.delete("/:stickerId", authorize("admin"), controller.deleteSticker);

export default route;
