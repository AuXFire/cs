import { Router } from "express";
import { SteamUser } from "@prisma/client";
import { io, prisma } from "..";
import { getUserFromTokenHeader } from "../utilities/webToken";
import * as errorCodes from "../utilities/errorCodes";

const roundRouter = Router();

roundRouter.get("/", async (req, res) => {
  res.status(200).json(io.currentRound);
});

roundRouter.put("/bet", getUserFromTokenHeader, async (req, res) => {
  const user: SteamUser = (req as any).user;

  const { betAmount, betFor } = req.body;
  if (!betAmount || !betFor) return errorCodes.missingBodyOrQueryError(res);
  if (betAmount > user.coins) return errorCodes.notEnoughBalanceError(res);

  const TEMP_BET_DATA = {
    betAmount,
    user,
    for: betFor,
  };

  io.emitToSpecificSocket("BET", {
    to: "global",
    data: TEMP_BET_DATA,
  });

  io.addBet(TEMP_BET_DATA);

  await prisma.steamUser.update({
    where: { id: user.id },
    data: {
      coins: {
        decrement: betAmount,
      },
    },
  });

  res.status(200).json(TEMP_BET_DATA);
});

export default {
  path: "/round",
  router: roundRouter,
};
