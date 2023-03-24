import "dotenv/config";

import Server from "./structures/ServerRouter";
import { SocketIO } from "./structures/SocketClass";
import { PrismaClient } from "@prisma/client";
import config from "./utilities/appConfig";
import SteamAuth from "node-steam-openid";

console.log(config);

export const server = new Server();
export const prisma = new PrismaClient();
export const io = new SocketIO();
export const steam = new SteamAuth({
  realm: config.steam.realm,
  returnUrl: config.steam.returnUrl,
  apiKey: config.steam.apiKey,
});
