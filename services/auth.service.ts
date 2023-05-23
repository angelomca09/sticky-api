import { IProfileUser, IUser } from "../interfaces/IUser";
import { isAdmin } from "../middlewares/auth.middleware";
import repository from "../repositories/user.repository";

async function getRole(username: string) {
  let role = "basic"; //could be a request
  if (username === "admin") {
    role = "admin";
  }
  return role;
}

async function auth(username: string, password: string) {
  if (isAdmin(username, password)) return true;

  const userPassword = await repository.getUserPasswordByUsername(username);
  if (!userPassword) return false;

  return userPassword === password;
}

async function signIn(user: IUser) {
  if (user.username.toLowerCase() === "admin") {
    return errorWithMessage("Nice try ;P");
  }
  if (await repository.existUser(user.username)) {
    return errorWithMessage("Username unavailable.");
  }
  try {
    if (await repository.insertUser(user)) {
      return await success(user.username);
    }
  } catch (err) {
    logger.info(`Error auth.service.js - ${JSON.stringify(err)}`);
    return errorWithMessage("Sign In Error!");
  }
}

async function logIn(user: IUser) {
  const { username, password } = user;
  if (await auth(username, password)) {
    return await success(username);
  }
  return errorWithMessage("Wrong username or password!");
}

async function success(username: string) {
  let profile: IProfileUser = {
    username,
  };
  if (username !== "admin") {
    const user = await repository.getUserByUsername(username);

    if (!user) return

    const { id, email, telephone } = user;
    profile = {
      id: id.toString(),
      username,
      email,
      telephone,
    };
  }

  return {
    success: true,
    access: await getRole(username),
    profile,
  };
}

async function errorWithMessage(message: string) {
  return {
    success: false,
    message,
  };
}

export default {
  getRole,
  auth,
  signIn,
  logIn,
};
