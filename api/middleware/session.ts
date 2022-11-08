import { Request } from "express";
import { CookieOptions } from "express-session"
import { signToken } from '../util/token';
import { UserProps } from '../models/User';

const envOptions: CookieOptions = process.env.NODE_ENV === 'production' ? {
  secure: true
} : {
  domain: 'localhost'
}

export const cookieOptions: CookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  signed: true,
  ...envOptions
}

export const addUserToSession = (req: Request, user: UserProps) => {
  let { _id, username, role } = user.toObject()
  req.session.user = { _id, username, role }
}
