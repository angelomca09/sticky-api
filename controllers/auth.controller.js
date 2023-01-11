import service from "../services/auth.service.js";

async function signIn(req, res, next) {
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
async function logIn(req, res, next) {
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
