import service from "../services/auth.service.js";

async function signIn(req, res, next) {
  try {
    const { name, email, telephone, password } = req.body;
    if (!name || !email || !telephone || !password) {
      throw new Error("Name, Email, Telephone and Password are necessary!");
    }
    res.send(await service.signIn(req.body));
    logger.info(`POST /auth/singIn - ${JSON.stringify(req.body)}`);
  } catch (err) {
    next(err);
  }
}
async function logIn(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email and Password are necessary!");
    }
    res.send(await service.logIn(req.body));
    logger.info(`POST /auth/logIn - ${JSON.stringify(req.body)}`);
  } catch (err) {
    next(err);
  }
}

export default { signIn, logIn };
