import authService from "../services/auth.service.js";
import userService from "../services/user.service.js";
import basicAuth from "express-basic-auth";

function authorize(...allowed) {
  const isAllowed = (role) => allowed.indexOf(role) > -1;

  return async (req, res, next) => {
    if (req.auth.user) {
      const role = await authService.getRole(req.auth.user);
      if (isAllowed(role)) {
        next();
      } else {
        res.status(401).send("Role not allowed");
      }
    } else {
      res.status(403).send("User not found");
    }
  };
}
function authorizeUserByBody() {
  return async (req, res, next) => {
    if (req.auth.user) {
      const user = await userService.getUser(req.body.userId);
      if (user.username === req.auth.user || req.auth.user === "admin") {
        next();
      } else {
        res.status(401).send("User not allowed");
      }
    } else {
      res.status(403).send("User not found");
    }
  };
}
function isAdmin(username, password) {
  const admUserMatches = basicAuth.safeCompare(username, "admin");
  const admPwdMatches = basicAuth.safeCompare(password, "admin1");
  return admUserMatches && admPwdMatches;
}

async function authorizer(username, password, callback) {
  //Admin bypass
  if (isAdmin(username, password)) return callback(null, true);

  return callback(null, await authService.auth(username, password));
}

export { authorize, isAdmin, authorizer, authorizeUserByBody };
