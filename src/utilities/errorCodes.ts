import { Response } from "express";
import { IRouteResponse } from "./types";

export const forbiddenError = (res: Response) => {
  res.status(403).json({
    success: false,
    error: "Forbidden",
    message: "You do not have permission to access this resource",
  } as IRouteResponse);
};

export const internalServerError = (res: Response) => {
  res.status(500).json({
    success: false,
    error: "Internal Server Error",
    message: "An internal server error has occurred",
  } as IRouteResponse);
};

export const notFoundError = (res: Response) => {
  res.status(404).json({
    success: false,
    error: "Not Found",
    message: "The requested resource could not be found",
  } as IRouteResponse);
};

export const unauthorizedError = (res: Response) => {
  res.status(401).json({
    success: false,
    error: "Unauthorized",
    message: "You are not authorized to access this resource",
  } as IRouteResponse);
};

export const unprocessableEntityError = (res: Response) => {
  res.status(422).json({
    success: false,
    error: "Unprocessable Entity",
    message: "The request could not be processed",
  } as IRouteResponse);
};

export const missingBodyOrQueryError = (res: Response) => {
  res.status(400).json({
    success: false,
    error: "Bad Request",
    message: "The request body or query is missing",
  } as IRouteResponse);
};

export const steamAuthError = (res: Response) => {
  res.status(400).json({
    success: false,
    error: "Bad Request",
    message: "Steam authentication failed",
  } as IRouteResponse);
};

export const notEnoughBalanceError = (res: Response) => {
  res.status(400).json({
    success: false,
    error: "Bad Request",
    message: "You do not have enough balance to place this bet",
  } as IRouteResponse);
};
