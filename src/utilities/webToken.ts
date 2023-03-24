import { Request, Response, NextFunction } from "express";
import { sign, verify } from "jsonwebtoken";
import { prisma } from "..";
import * as errorCodes from "../utilities/errorCodes";
import config from "./appConfig";

export const generateToken = (payload: any) =>
  sign(payload, config.webTokenSecret!, { expiresIn: "1h" });

export const verifyToken = (token: string) => {
  try {
    return verify(token, config.webTokenSecret!);
  } catch {
    return null;
  }
};

export const getUserFromTokenHeader = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization!.split(" ")[1];

  const tokenValid = verifyToken(token!);
  if (!tokenValid) return errorCodes.forbiddenError(res);
  if (typeof tokenValid === "string")
    return errorCodes.internalServerError(res);

  const user = await prisma.steamUser.findUnique({
    where: {
      id: tokenValid.id,
    },
  });
  if (!user) return errorCodes.forbiddenError(res);

  (req as any).user = user;
  next();
};
