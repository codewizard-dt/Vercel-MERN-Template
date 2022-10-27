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
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, Content-Type, Accept"
  );
  next();
});

/**
 * Routes
 */
app.get('/hello', hello)
app.use('/auth', authRouter)

// if (isProduction) {
//   /** Serve static React build */
//   app.use(express.static(path.join(__dirname, '../../client/build')));
// }

/** Serve app entry point */
if (!isProduction) app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.use(checkAuth)
// app.use('/api', apiRouter)

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
})

// export default apiRouter