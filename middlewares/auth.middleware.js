import authService from "../services/auth.service.js";
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

async function authorizer(username, password, callback) {
  //Admin bypass
  const admUserMatches = basicAuth.safeCompare(username, "admin");
  const admPwdMatches = basicAuth.safeCompare(password, "admin1");

  if (admUserMatches && admPwdMatches) return callback(null, true);

  return callback(null, await authService.auth(username, password));
}

export { authorize, authorizer };
