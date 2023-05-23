import express from "express";
import service from "../services/auth.service";

async function signIn(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const { username, email, telephone, password } = req.body;
    if (!username || !email || !telephone || !password) {
      throw new Error("Username, Email, Telephone and Password are necessary!");
    }
    res.send(await service.signIn(req.body));
    logger.info(`POST /auth/singIn - ${JSON.stringify(req.body)}`);
  } catch (err) {
    next(err);
  }
}
async function logIn(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new Error("Username and Password are necessary!");
    }
    res.send(await service.logIn(req.body));
    logger.info(`POST /auth/logIn - ${JSON.stringify(req.body)}`);
  } catch (err) {
    next(err);
  }
}

export default { signIn, logIn };
