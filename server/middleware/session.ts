import { Request } from "express";
import { CookieOptions } from "express-session"
import { UserProps } from '../models/User';

export const cookieOptions: CookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: 'strict',
  path: '/',
}

export const addUserToSession = (req: Request, user: UserProps) => {
  let { _id, username, role } = user.toObject()
  req.session.user = { _id, username, role }
}
