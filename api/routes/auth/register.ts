import { RequestHandler } from "express";
import ConnectDB from "../../db/ConnectDB";
import User from "../../models/User";
import { signAuthToken } from "../../util/auth";

const register: RequestHandler<{ username: string, email: string, password: string }> = async (req, res) => {
  await ConnectDB()
  let { _id, username } = await User.create(req.body)
  let token = signAuthToken({ _id, username })
  res.json({ data: { token } })
}

export default register