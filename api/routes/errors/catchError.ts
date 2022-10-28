import { RequestHandler } from "express"

export const catchError = (handler: RequestHandler<any>): RequestHandler => {
  return async function (req, res, next) {
    try {
      await handler(req, res, next)
    } catch (error) {
      next(error);
    }
  }
}