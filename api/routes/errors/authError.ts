import { ErrorRequestHandler } from "express"

export class AuthError extends Error {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, AuthError.prototype)
  }
  status = 401
}

export const catchAuthError: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof AuthError) {
    res.status(401).json({ error: error.message })
  } else {
    next()
  }
}
