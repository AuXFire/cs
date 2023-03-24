import { resolve } from "path";
import { IConfig } from "./types";

const { BASEURL, SECRET, STEAMKEY, STEAMREALM, STEAMRETURNURL, DEVELOPERMODE } =
  process.env;

const configLoadedFromJSON: IConfig = require(resolve(
  __dirname,
  "..",
  "config.json"
));

const config: IConfig = {
  steam: configLoadedFromJSON.steam || {
    realm: STEAMREALM!,
    returnUrl: STEAMRETURNURL!,
    apiKey: STEAMKEY!,
  },
  baseUrl: BASEURL || configLoadedFromJSON.baseUrl,
  webTokenSecret:
    // require("crypto").randomBytes(64).toString("hex") ||
    SECRET || configLoadedFromJSON.webTokenSecret,
  developerMode:
    (DEVELOPERMODE?.toLowerCase() || "false") === "true" ||
    configLoadedFromJSON.developerMode ||
    false,
};

export default config;
