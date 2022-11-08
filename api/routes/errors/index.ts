import { Application } from 'express'
import { catchAuthError } from './authError'
import { catchValidationError } from './validationError'
import { catchGenericError } from './genericError';

export default function catchErrors(app: Application) {
  app.use(catchValidationError)
  app.use(catchAuthError)
  app.use(catchGenericError)
}