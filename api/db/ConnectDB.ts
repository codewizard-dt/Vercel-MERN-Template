import mongoose, { ConnectOptions } from 'mongoose'

let cached = global.mongoose
if (!cached) cached = global.mongoose = { conn: null, promise: null }

/**
 * Creates and caches a global mongoose connection 
 * @returns Mongoose connection
 */
const ConnectDB = async () => {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    let URL = process.env.MONGODB_URI
    if (!URL) console.log('define MONGODB_URI env variable to connect')
    cached.promise = mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'vercel-template'
      } as ConnectOptions,
      function () {
        console.log('MongoDB connected')
      }
    )
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default ConnectDB
