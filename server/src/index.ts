import express, { Router } from 'express'
import path from 'path'
import authRouter from "./routes";
import { checkAuth } from './middleware/auth'

const isProduction = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 3001
if (!isProduction) {
  require('dotenv').config({ path: path.join(__dirname, '../.env') })
}

/**
 * Server setup
 */
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * Routes 
 */
const vercelApi = Router()
/** Add all routes to the vercelApi Router */
vercelApi.use('/auth', authRouter)
/** Apply vercelApi Router to /api endpoint */
app.use('/api', vercelApi)

let clientBuildPath = '../../../client/build'
if (!isProduction) {
  /** 
   * IN PRODUCTION, ON VERCEL, NONE OF THIS IS NECESSARY
   * Serve static files 
   * Serve landing page
   * Catch all other routes and serve the landing page
   */
  app.use(express.static(path.join(__dirname, clientBuildPath)))
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, clientBuildPath, 'index.html'))
  })
  app.get('**', (req, res) => {
    res.sendFile(path.join(__dirname, clientBuildPath, 'index.html'))
  })
}

app.use(checkAuth)

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
})

export default app