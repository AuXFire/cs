import { Router } from "express";
import { getUserFromTokenHeader } from "../utilities/webToken";
import * as errorCodes from "../utilities/errorCodes";
import * as prismaHelper from "../utilities/prisma";
import { SteamUser } from "@prisma/client";

const accountRouter = Router();

accountRouter.get("/", getUserFromTokenHeader, async (req, res) => {
  res.status(200).json((req as any).user);
});

accountRouter.get("/link", getUserFromTokenHeader, async (req, res) => {
  const user: SteamUser = (req as any).user;

  const newLink = await prismaHelper.createLoginLink(user.steamId);
  if (!newLink) return errorCodes.internalServerError(res);

  res.status(200).json(newLink);
});

accountRouter.get("/link/login", async (req, res) => {
  const link = req.query.l as string;

  const user = await prismaHelper.steamUserFromLink(link);
  if (!user) return errorCodes.internalServerError(res);

  const token = await prismaHelper.tokenSteamUser(user.steamId);
  if (!token) return errorCodes.internalServerError(res);

  res.redirect(`http://localhost:5173/login?d=${token.token}`);
});

export default {
  path: "/account",
  router: accountRouter,
};
