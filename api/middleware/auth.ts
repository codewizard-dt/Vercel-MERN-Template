import { RequestHandler } from "express";
import { decodeAuthToken } from "../util/auth";

export const checkAuth: RequestHandler = (req, res, next) => {
  let header = req.header('Authorization')
  if (header) {
    let token = header.split(' ')[1]
    try {
      req.user = decodeAuthToken(token)
    } catch (error) {
      console.log('Invalid Token', token)
      req.user = null
    }
  }
  next()
}