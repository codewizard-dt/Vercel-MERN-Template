import { RequestHandler } from "express";
import { signToken } from "../../util/auth";

const login: RequestHandler = async (req, res) => {
  let token = signToken(req.body)
  res.json({ token })
}

export default login