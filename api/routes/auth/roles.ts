import { RequestHandler } from "express";
import ConnectDB from "../../db/dbConnect";
import { ID } from "../../db/Types";
import User from "../../models/User";
import { AuthError } from "../errors/authError";

// /api/auth/user/:userId/create-admin
export const createAdmin: RequestHandler = async (req, res) => {
  const { userId } = req.params
  let user = await User.findByIdAndUpdate({ _id: new ID(userId) }, {
    $set: { role: 'admin' }
  }, { new: true })
  if (user) res.json({ admin: user._id })
  else res.status(400).json({ error: 'User not found' })
}
// /api/auth/user/:userId/revoke-admin
export const revokeAdmin: RequestHandler = async (req, res) => {
  const { userId } = req.params
  if (userId === req.session.user?._id) throw new AuthError('Cannot revoke your own admin status')
  // if (userId === req.session.user?._id) return res.status(400).json({ error: 'Cannot revoke your own admin status' })
  let user = await User.findByIdAndUpdate({ _id: new ID(userId) }, {
    $set: { role: 'user' }
  }, { new: true })
  if (user) res.json({ admin: false })
  else res.status(400).json({ error: 'User not found' })
}