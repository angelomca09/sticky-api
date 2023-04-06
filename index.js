import express from "express";
import cors from "cors";
import { authorizer } from "./middlewares/auth.middleware.js";
import basicAuth from "express-basic-auth";
import "./logs/index.js"; //Logs Module

const app = express();
app.use(express.json());
app.use(cors());

//#region //* ROUTES *//

//* Routes without auth

import authRoute from "./routes/auth.route.js";
app.use("/auth", authRoute);

//* BasicAuth
app.use(
  basicAuth({
    authorizer,
    authorizeAsync: true,
  })
);

//* Routes with Auth
import stickerRoute from "./routes/sticker.route.js";
import albumRoute from "./routes/album.route.js";
import userRoute from "./routes/user.route.js";

app.use("/sticker", stickerRoute);
app.use("/album", albumRoute);
app.use("/user", userRoute);
//#endregion

//Receive all errors from Controllers
app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} ${req.message}`);
  res.status(400).send({ error: err.message });
});

app.listen(3000, () =>
  console.log("API Started! Running at: http://localhost:3000")
);
