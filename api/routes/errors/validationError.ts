import { ErrorRequestHandler, RequestHandler } from "express"
import { JsonWebTokenError } from "jsonwebtoken";
import { DuplicateKeyError, ValidationError } from "../../db/Errors";

export const catchValidationError: ErrorRequestHandler = (error, req, res, next) => {
  console.log("CAUGHTY BY VALIDATOR")
  try {
    if (error instanceof JsonWebTokenError) {
      res.status(401).json({ error: { token: 'Unauthorized' } })
    } else if (error.name) {
      switch (error.name) {
        case 'ValidationError':
          const validationError: ValidationError = error;
          if (validationError.errors) {
            res.status(400).json({ error: { validation: Object.values(validationError.errors).map(error => error.properties.message).join(' ') } });
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
          console.error(`Unhandled '${error.name}' error`, error.message)
          res.status(500).json({ error });
      }
    } else {
      // console.log(error.name);
      console.log('Unhandled error')
      console.dir({ error })
      res.status(500).json({ error: error });
    }

  } catch (caughtError) {
    console.error('Error');
    console.log({ error, caughtError })
  }


}