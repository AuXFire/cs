import { Router } from "express";
import { steam } from "..";
import { ISteamUser } from "../utilities/types";
import * as prismaHelper from "../utilities/prisma";
import * as errorCodes from "../utilities/errorCodes";

const router = Router();

router.get("/", async (req, res) => {
  return res.redirect(await steam.getRedirectUrl());
});

router.get("/auth", async (req, res) => {
  const user: ISteamUser = (await steam
    .authenticate(req)
    .catch((err) => {})) as any;

  if (!user) return errorCodes.steamAuthError(res);
  let dbUser = await prismaHelper.steamUser(user.steamid);
  if (!dbUser) dbUser = await prismaHelper.createSteamUser(user);

  const token = await prismaHelper.tokenSteamUser(dbUser.steamId);

  return res.redirect(`http://localhost:5173/login?d=${token.token}`);
});

export default {
  path: "/steam",
  router,
};
