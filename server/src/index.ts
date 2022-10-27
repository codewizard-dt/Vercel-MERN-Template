// import express from 'express'
// import path from 'path'

// // import apiRouter from './api'
// import { checkAuth } from './middleware/auth'

// const PORT = process.env.PORT || 3001
// const isProduction = process.env.NODE_ENV === 'production'

// if (!isProduction) {
//   require('dotenv').config({ path: path.join(__dirname, '../.env') })
// }

// const app = express()
// app.use(function (req, res, next) {
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Authorization, Origin, Content-Type, Accept"
//   );
//   next();
// });
// app.use(express.json())

// app.use(express.urlencoded({ extended: true }))

// if (isProduction) {
//   app.use(express.static(path.join(__dirname, '../../client/build')));
//   app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../client/build/index.html'))
//   })
// } else {
//   app.get('/', (req, res) => {
//     res.send("This is a backend route")
//   })
// }

// app.use(checkAuth)
// // app.use('/api', apiRouter)

// app.listen(PORT, () => {
//   console.log(`API server running on port ${PORT}!`);
// })