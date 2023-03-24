import { prisma } from "..";
import { generateToken } from "./webToken";
import { ISteamUser } from "./types";

export const steamUser = async (steamId?: string, id?: string) => {
  const user = await prisma.steamUser.findUnique({
    where: { steamId: steamId, id: id },
  });

  return user;
};

export const createSteamUser = async (userObject: ISteamUser) => {
  const user = await prisma.steamUser.create({
    data: {
      steamId: userObject.steamid,
      avatarUrl: userObject._json.avatarfull,
      personaName: userObject._json.personaname,
      realName: userObject._json.realname,
    },
  });

  return user;
};

export const tokenSteamUser = async (steamId?: string, id?: string) => {
  const user = await prisma.steamUser.findUnique({
    where: { steamId: steamId, id: id },
    select: {
      id: true,
      steamId: true,
    },
  });

  const token = generateToken(user);

  return {
    user,
    token,
  };
};

export const createLoginLink = async (steamId?: string, id?: string) => {
  const user = await prisma.steamUser.findUnique({
    where: { steamId: steamId, id: id },
    select: {
      id: true,
      steamId: true,
    },
  });

  const link = await prisma.loginLink.create({
    data: {
      steamUserId: user!.id,
    },
  });

  return {
    link,
  };
};

export const steamUserFromLink = async (link: string) => {
  const foundLink = await prisma.loginLink.findUnique({
    where: { id: link },
  });

  const foundSteamUser = await prisma.steamUser.findUnique({
    where: { id: foundLink?.steamUserId },
  });

  return foundSteamUser;
};

export const addBetToUser = async (
  steamId: string,
  betAmount: number,
  multiplier: number
) => {
  const bet = await prisma.steamUser.update({
    where: { steamId },
    data: {
      coins: {
        increment: betAmount * multiplier,
      },
    },
  });

  return bet;
};
