import express from "express";
import cors from "cors";
import "./logs/index.js"; //Logs Module

const app = express();
app.use(express.json());
app.use(cors());

//* ROUTES *//

//Receive all errors from Controllers
app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} ${req.message}`);
  res.status(400).send({ error: err.message });
});

app.listen(3000, () => console.log("API Started!"));
