import { RequestHandler } from "express";
import ConnectDB from "../../db/ConnectDB";
import User from "../../models/User";
import { signAuthToken } from "../../util/auth";

const login: RequestHandler<{ username: string, password: string }> = async (req, res) => {
  await ConnectDB()
  let { username, password } = req.body
  let isValid = await User.findAndValidate(username, password)
  let token: string | null = null
  if (isValid) {
    token = signAuthToken({ username, _id: isValid._id })
    res.json({ data: { token } })
  } else {
    res.status(401).json({ error: 'Invalid credentials' })
  }

}

export default login