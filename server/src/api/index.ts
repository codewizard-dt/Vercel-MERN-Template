import express from 'express'
import path from 'path'
import { Router } from "express";
import authRouter from "./auth";
import hello from "./hello";
import { checkAuth } from '../middleware/auth'

const isProduction = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 3001
if (!isProduction) {
  require('dotenv').config({ path: path.join(__dirname, '../.env') })
}

// const apiRouter = Router()

/**
 * Server setup
 */
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(function (req, res, next) {
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Authorization, Origin, Content-Type, Accept"
//   );
//   next();
// });

/**
 * Routes
 */
app.get('/api/hello', hello)
app.use('/api/auth', authRouter)

/** Define client build path based on environment */
let clientBuildPath = isProduction ? '../public' : '../../../client/build'
if (!isProduction) {
  /** 
   * If not in production, serve static files 
   * When in production Vercel will serve them automatically
   */
  app.use(express.static(path.join(__dirname, clientBuildPath)))
}
/** 
 * Serve the landing page
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, clientBuildPath, 'index.html'))
})
/**
 * Catch all other routes and serve the landing page
 */
app.get('**', (req, res) => {
  res.sendFile(path.join(__dirname, clientBuildPath, 'index.html'))
})

app.use(checkAuth)
// app.use('/api', apiRouter)

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
})

export default app