import express, { Router } from 'express'
import path from 'path'
require('dotenv').config()
import authRouter from "./routes/auth";
import usersRouter from './routes/users';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { cookieOptions } from './middleware/session';
import { useDb } from './middleware/useDb';
import { verifyAuth } from './middleware/auth';
import catchErrors from './routes/errors';

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
app.use(session({
  secret: process.env.APP_SECRET || 'development',
  cookie: cookieOptions,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    dbName: process.env.DB_NAME || 'vercel-template',
    collectionName: 'sessions',
    crypto: {
      secret: process.env.APP_SECRET || 'development',
    }
  })
}))
app.use(verifyAuth)

/**
 * Routes 
 * Add all routes to the vercelApi Router so that we can apply '/api' to the entire router
 */
const vercelApi = Router()
vercelApi.use('/auth', useDb, authRouter)
vercelApi.use('/users', useDb, usersRouter)

app.use('/api', vercelApi)
// app.use(catchValidationError)
// app.use(catchAuthError)
// app.use(catchGenericError)

catchErrors(app)

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
})

/**
 * Usually we don't export the app, but for Vercel deployment this is crucial
 * Without this the Vercel build step won't extract this module as a serverless function
 */
export default app