import { Request, Response, NextFunction } from "express";
import HttpException from "../common/http-exception";

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // const err = new Error(`Can't find ${request.originalUrl}`);
  // const errObj = Object.assign(err, {error: true, status: 'error', statusCode: 404});
  const err = new HttpException(`Can't find ${request.originalUrl}`, 404);
  next(err);
};
