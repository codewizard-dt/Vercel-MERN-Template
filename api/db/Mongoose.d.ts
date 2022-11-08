import Mongoose from "mongoose"

declare global {
  var mongoose: Promise<typeof Mongoose>
}
export { }