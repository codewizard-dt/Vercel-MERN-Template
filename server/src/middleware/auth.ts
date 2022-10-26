import { RequestHandler } from "express";
import { decodeToken } from "../util/auth";

export const checkAuth: RequestHandler = (req, res, next) => {
  let header = req.header('Authorization')
  if (header) {
    let token = header.split(' ')[1]
    try {
      req.user = decodeToken(token)
    } catch (error) {
      console.log('Invalid Token', token)
      req.user = null
    }
  }
  next()
}