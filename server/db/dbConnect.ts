import mongoose, { ConnectOptions } from 'mongoose'

if (!process.env.MONGODB_URI) console.log('define MONGODB_URI env variable to connect')

async function dbConnect(): Promise<typeof mongoose> {
  if (!global.mongoose) {
    mongoose.connection
      .on('open', () => console.log('Mongoose connected'))
      .on('close', () => console.log('Mongoose closed'))
      .on('error', (error) => console.log(error))

    global.mongoose = mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DB_NAME || 'vercel-template'
      } as ConnectOptions
    )
  }
  return global.mongoose
}

export default dbConnect
