import { Express, Router } from "express";
import { catchValidationError } from "./validationError";

const errorHandler = Router()

errorHandler.use(catchValidationError)

export default errorHandler