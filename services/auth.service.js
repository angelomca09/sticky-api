import repository from "../repositories/user.repository.js";
import { convertUsertoModel as c } from "../utils/convert.js";

async function getRole(username) {
  if (username === "admin") {
    return "admin";
  }
  if (await repository.getUserByEmail(username)) {
    return "basic";
  }
  return "any";
}

async function auth(username, user_password) {
  const user = await repository.getUserByEmail(username);
  if (!user) return false;

  return user.userPassword === user_password;
}

async function signIn(user) {
  if (user.email.toLowerCase() === "admin") {
    return errorWithMessage("Nice try ;P");
  }
  if (await repository.getUserByEmail(user.email)) {
    return errorWithMessage("Email unavailable.");
  }
  try {
    if (await repository.insertUser(c(user))) {
      return success(user.email);
    }
  } catch (err) {
    logger.info(`Error auth.service.js - ${JSON.stringify(err)}`);
    return errorWithMessage("Sign In Error!");
  }
}

async function logIn(user) {
  const { email, password } = user;
  if (await auth(email, password)) {
    return success(email);
  }
  return errorWithMessage("Wrong username or password!");
}

async function success(username) {
  const { userId, userName, userEmail, userTelephone } =
    await repository.getUserByEmail(username);
  return {
    success: true,
    access: await getRole(username),
    profile: {
      id: userId,
      name: userName,
      email: userEmail,
      telephone: userTelephone,
    },
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
