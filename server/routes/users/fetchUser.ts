import { RequestHandler } from "express";
import User from "../../models/User";

const fetchUser: RequestHandler = async (req, res) => {
  let { userId } = req.params
  const user = await User.findById(userId)
  if (!user) throw new Error('User not found')
  res.json({ user: user.toObject() })
}

export default fetchUser