import { Server, Socket } from "socket.io";
import { prisma, server } from "..";
import { join } from "path";
import { readdirSync } from "fs";
import { verifyToken } from "../utilities/webToken";
import { IEmit, IEvent } from "../utilities/types";
import { SteamUser } from "@prisma/client";
import * as prismaHelper from "../utilities/prisma";

const COUNTDOWN_TIME = 15;
const SPIN_TIME = 5;
const PAUSE_TIME = 4;

enum COIN_TO_BE {
  SPECIAL = 3,
  CT = 1,
  T = 2,
}

const COIN_ODDS = {
  [COIN_TO_BE.SPECIAL]: 0.01,
  [COIN_TO_BE.CT]: 0.495,
  [COIN_TO_BE.T]: 0.495,
} as {
  [key: number]: number;
};

export class SocketIO {
  public io: Server;
  public socketInterval: NodeJS.Timeout;

  public currentRound: {
    spinTime: number;
    pauseTime: number;
    countdownTime: number;
    dateNow: number;
    bets: Array<{
      betAmount: number;
      user: SteamUser;
      for: number;
    }>;
  } = {
    countdownTime: COUNTDOWN_TIME,
    dateNow: Date.now(),
    pauseTime: PAUSE_TIME,
    spinTime: SPIN_TIME,
    bets: [],
  };
  public coinToBe: COIN_TO_BE = COIN_TO_BE.SPECIAL;

  constructor() {
    this.io = require("socket.io")(server.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    this.registerEvents();

    this.socketInterval = setInterval(() => {
      const random = Math.random();
      let current = 0;
      for (const coin in COIN_ODDS) {
        current += COIN_ODDS[coin] as typeof COIN_ODDS[0];
        if (random < current) {
          this.coinToBe = parseInt(coin);
          break;
        }
      }

      this.currentRound = {
        spinTime: SPIN_TIME,
        pauseTime: PAUSE_TIME,
        countdownTime: COUNTDOWN_TIME,
        dateNow: Date.now(),
        bets: [],
      };

      this.emitToSpecificSocket("COUNTDOWN", {
        to: "global",
        data: this.currentRound,
      });

      setTimeout(() => {
        this.emitToSpecificSocket("SPIN", {
          to: "global",
          data: {
            ...this.currentRound,
            coinToBe: this.coinToBe,
          },
        });
      }, 1000 * COUNTDOWN_TIME);

      setTimeout(
        this.calculateBets.bind(this),
        1000 * (COUNTDOWN_TIME + SPIN_TIME)
      );

      setTimeout(() => {
        this.emitToSpecificSocket("COMPLETE", {
          to: "global",
          data: {
            winner: this.coinToBe,
          },
        });
      }, 1000 * (COUNTDOWN_TIME + SPIN_TIME));
    }, 1000 * (COUNTDOWN_TIME + SPIN_TIME + PAUSE_TIME));
  }

  public async calculateBets() {
    const tBets = this.currentRound.bets.filter(
      (bet) => bet.for === COIN_TO_BE.T
    );
    const ctBets = this.currentRound.bets.filter(
      (bet) => bet.for === COIN_TO_BE.CT
    );
    const specialBets = this.currentRound.bets.filter(
      (bet) => bet.for === COIN_TO_BE.SPECIAL
    );

    if (this.coinToBe === COIN_TO_BE.CT) {
      ctBets.forEach(async (bet) => {
        prismaHelper.addBetToUser(bet.user.steamId, bet.betAmount, 2);

        this.emitToSpecificSocket("WINNER", {
          to: bet.user.steamId,
          data: {
            winner: COIN_TO_BE.CT,
            bet,
            multiplier: 2,
          },
        });
      });
    }

    if (this.coinToBe === COIN_TO_BE.T) {
      tBets.forEach(async (bet) => {
        prismaHelper.addBetToUser(bet.user.steamId, bet.betAmount, 2);

        this.emitToSpecificSocket("WINNER", {
          to: bet.user.steamId,
          data: {
            winner: COIN_TO_BE.T,
            bet,
            multiplier: 2,
          },
        });
      });
    }

    if (this.coinToBe === COIN_TO_BE.SPECIAL) {
      specialBets.forEach(async (bet) => {
        prismaHelper.addBetToUser(bet.user.steamId, bet.betAmount, 16);

        this.emitToSpecificSocket("WINNER", {
          to: bet.user.steamId,
          data: {
            winner: COIN_TO_BE.SPECIAL,
            bet,
            multiplier: 16,
          },
        });
      });
    }
  }

  public async addBet(bet: typeof this.currentRound.bets[0]) {
    this.currentRound.bets.push(bet);
  }

  private async registerEvents() {
    const eventFiles = readdirSync(join(__dirname, "..", "events"));

    for (const file of eventFiles) {
      const event: IEvent = await import(`../events/${file}`);
      if (event.default.for === "CLIENT") continue;
      this.io.on(event.default.name, event.default.run);
    }
  }

  public async registerClientEvents(socket: Socket) {
    const eventFiles = readdirSync(join(__dirname, "..", "events"));

    for (const file of eventFiles) {
      const event: IEvent = await import(`../events/${file}`);
      if (event.default.for === "SERVER") continue;
      socket.on(event.default.name, (data: any) =>
        event.default.run(socket, data)
      );
    }
  }

  public async registerRooms(socket: Socket) {
    if (socket.rooms.has("global")) return;
    socket.join("global");
  }

  public async socketToken(socket: Socket) {
    const authToken = socket.handshake.auth.token.replace(/\s/g, "");
    if (!authToken || !!!authToken) return;

    const newToken = verifyToken(authToken);
    if (!newToken || typeof newToken !== "object") return;

    const user = await prisma.steamUser
      .findUnique({
        where: {
          id: newToken.id,
        },
      })
      .catch(() => null);

    if (user) socket.join(user.steamId);
  }

  public async emitToSpecificSocket(event: string, args: IEmit) {
    this.io.to(args.to.toString()).emit(event, args.data);
  }
}
