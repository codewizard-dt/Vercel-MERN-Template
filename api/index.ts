import express, { Router } from 'express'
import path from 'path'
import authRouter from "./routes/auth";
import { checkAuth } from './middleware/auth'
import ConnectDB from './db/ConnectDB';
import useErrorHandlers from './routes/errors';
import errorHandler from './routes/errors';
import { catchValidationError } from './routes/errors/validationError';

const isProduction = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 3001
if (!isProduction) {
  require('dotenv').config({ path: path.join(__dirname, './.env') })
}

/**
 * Server setup
 */
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(checkAuth) // If there is an auth token, adds the encoded info to req.user
ConnectDB()

/**
 * Routes 
 * Add all routes to the vercelApi Router so that we can apply '/api' to the entire router
 */
const vercelApi = Router()
vercelApi.use('/auth', authRouter)
app.use('/api', vercelApi)
app.use(catchValidationError)

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
})

/**
 * Usually we don't export the app, but for Vercel deployment this is crucial
 * Without this the Vercel build step won't extract this module as a serverless function
 */
export default app