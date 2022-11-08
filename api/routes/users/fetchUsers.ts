import { RequestHandler } from "express";
import ConnectDB from "../../db/dbConnect";
import User from "../../models/User";

const fetchUsers: RequestHandler = async (req, res) => {
  const users = await User.find({})
  res.json({ users: users.map(user => user.toObject()) })
}

export default fetchUsers