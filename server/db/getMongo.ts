import dbConnect from "./dbConnect";
import { Db as MongoDB } from 'mongodb'

export async function getMongo(): Promise<MongoDB> {
  return dbConnect().then(mongoose => mongoose.connection.db)
}