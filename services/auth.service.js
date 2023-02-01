import { isAdmin } from "../middlewares/auth.middleware.js";
import repository from "../repositories/user.repository.js";

async function getRole(username) {
  let role = "basic"; //could be a request
  if (username === "admin") {
    role = "admin";
  }
  return role;
}

async function auth(username, password) {
  if (isAdmin(username, password)) return true;

  const user = await repository.getUserByUsername(username);
  if (!user) return false;

  return user.password === password;
}

async function signIn(user) {
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

async function logIn(user) {
  const { username, password } = user;
  if (await auth(username, password)) {
    return await success(username);
  }
  return errorWithMessage("Wrong username or password!");
}

async function success(username) {
  let profile = {
    username,
  };
  if (username !== "admin") {
    const user = await repository.getUserByUsername(username);
    const { _id: id, email, telephone } = user;
    profile = {
      id,
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

async function errorWithMessage(message) {
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
