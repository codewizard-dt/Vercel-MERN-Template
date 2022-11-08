import { RequestHandler } from "express";
import dbConnect from "../../db/dbConnect";
import User from "../../models/User";
import { signAuthToken } from "../../util/auth";

const register: RequestHandler<{ username: string, email: string, password: string }> = async (req, res) => {
  let { _id, username, role } = await User.create(req.body)
  let token = signAuthToken({ _id, username, role })
  res.json({ token })
}

export default register