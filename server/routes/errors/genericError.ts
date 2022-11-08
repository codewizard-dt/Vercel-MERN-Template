import { ErrorRequestHandler } from "express"

export const catchGenericError: ErrorRequestHandler = (error, req, res, next) => {
  console.log('catchGenericError', error.message)
  let message = error.message || 'Network error. Please try again later'
  console.dir(error)
  return res.status(200).json({ error: message })
}
