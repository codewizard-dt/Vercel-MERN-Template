import { RequestHandler } from "express";
import dbConnect from "../db/dbConnect";
import User from "../models/User";
import { AuthError } from "../routes/errors/authError";
import { signAuthToken } from '../util/auth';
import { addUserToSession } from "./session";

export const verifyAuth: RequestHandler = async (req, res, next) => {
  dbConnect()
  if (req.session.user) {
    const user = await User.findById(req.session.user._id)
    if (!user) next(new AuthError('Invalid authentication'))
    else {
      res.setHeader('Authorization', signAuthToken(user.toObject()))
      addUserToSession(req, user)
    }
  }
  next()
}

export const requireAdmin: RequestHandler = async (req, res, next) => {
  if (req.session.user && req.session.user.role !== 'admin') {
    next(new AuthError('Admin authorization required'))
  }
  next()
}

export const requireAuth: RequestHandler = async (req, res, next) => {
  if (!req.session.user) {
    next(new AuthError('Not logged in'))
  }
  next()
}