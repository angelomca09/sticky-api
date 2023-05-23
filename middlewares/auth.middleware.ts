import express from "express";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import basicAuth from "express-basic-auth";

function authorize(...allowed: string[]) {
  const isAllowed = (role: string) => allowed.indexOf(role) > -1;

  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if ((req as any).auth.user) {
      const role = await authService.getRole((req as any).auth.user);
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
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if ((req as any).auth.user) {
      const user = await userService.getUser(req.body.userId);
      if (user?.username === (req as any).auth.user || (req as any).auth.user === "admin") {
        next();
      } else {
        res.status(401).send("User not allowed");
      }
    } else {
      res.status(403).send("User not found");
    }
  };
}
function isAdmin(username: string, password: string) {
  const admUserMatches = basicAuth.safeCompare(username, "admin");
  const admPwdMatches = basicAuth.safeCompare(password, "admin1");
  return admUserMatches && admPwdMatches;
}

async function authorizer(username: string, password: string, callback: basicAuth.AsyncAuthorizerCallback) {
  //Admin bypass
  if (isAdmin(username, password)) return callback(null, true);

  return callback(null, await authService.auth(username, password));
}

export { authorize, isAdmin, authorizer, authorizeUserByBody };
