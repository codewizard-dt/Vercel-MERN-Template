import { RequestHandler } from "express";
import ConnectDB from "../../db/ConnectDB";
import { signAuthToken } from "../../util/auth";

const login: RequestHandler<{ username: string, password: string }> = async (req, res) => {
  await ConnectDB()
  let token = signAuthToken(req.body)
  res.json({ token })
}

export default login