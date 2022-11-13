import { ErrorRequestHandler } from "express"
import { JsonWebTokenError } from "jsonwebtoken";
import { DuplicateKeyError, ValidationError } from "../../db/Errors";

export const catchValidationError: ErrorRequestHandler = (error, req, res, next) => {
  try {
    if (error instanceof JsonWebTokenError) {
      res.status(401).json({ error: { token: 'Unauthorized' } })
    } else if (error.name) {
      switch (error.name) {
        case 'ValidationError':
          const validationError: ValidationError = error;
          if (validationError.errors) {
            let errors: { [key: string]: string } = {}
            for (let [prop, error] of Object.entries(validationError.errors)) {
              errors[prop] = error.properties.message
            }
            res.status(400).json({ errors })
          } else if (validationError.properties) {
            res.status(400).json({ error: validationError.properties.message });
          }
          return;
        case 'MongoServerError':
          if (error.message.includes('duplicate key error')) {
            const e0: DuplicateKeyError = error
            let errors: { [key: string]: string } = {}
            for (let key of Object.keys(e0.keyValue)) {
              errors[key] = 'Already exists'
            }
            res.status(400).json({ errors })
          }
          return
        default:
          next(error)
      }
    }
  } catch (caughtError) {
    next(caughtError)
  }
}