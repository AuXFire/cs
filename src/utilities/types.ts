import { Router, Response } from "express";

export interface IConfig {
  steam: {
    realm: string;
    returnUrl: string;
    apiKey: string;
  };
  baseUrl: string;
  webTokenSecret: string;
  developerMode: boolean;
}

export interface IRoute {
  default: {
    path: string;
    router: Router;
  };
}

export interface IRouteResponse {
  error?: string;
  message?: string;
  success: boolean;
}

export interface IEmit {
  to: string;
  data: any;
}

export interface IEvent {
  default: {
    name: string;
    run: (...args: any) => void;
    for: SocketEventFor;
  };
}

export enum SocketEventFor {
  CLIENT = "CLIENT",
  SERVER = "SERVER",
}

export interface ISteamUser {
  _json: {
    steamid: string;
    communityvisibilitystate: number;
    profilestate: number;
    personaname: string;
    commentpermission: number;
    profileurl: string;
    avatar: string;
    avatarmedium: string;
    avatarfull: string;
    avatarhash: string;
    lastlogoff: number;
    personastate: number;
    realname: string;
    primaryclanid: string;
    timecreated: number;
    personastateflags: number;
  };
  steamid: string;
  username: string;
  name: string;
  profile: string;
  avatar: {
    small: string;
    medium: string;
    large: string;
  };
}
