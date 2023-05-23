import express from "express";
import controller from "../controllers/auth.controller";

const route = express.Router();

route.post("/signIn", controller.signIn);
route.post("/logIn", controller.logIn);

export default route;
