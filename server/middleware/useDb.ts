import { RequestHandler } from "express"
import dbConnect from "../db/dbConnect"

export const useDb: RequestHandler = (req, res, next) => {
  dbConnect()
  next()
}