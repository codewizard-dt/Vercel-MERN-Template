import { RequestHandler } from "express";
import dbConnect from "../../db/dbConnect";
// import ConnectDB from "../../db/dbConnection";
import User from "../../models/User";
import { signAuthToken } from "../../util/auth";

const login: RequestHandler<{ username: string, password: string }> = async (req, res) => {
  // dbConnect()
  let { username, password } = req.body
  let isValid = await User.findAndValidate(username, password)
  let token: string | null = null
  if (isValid) {
    let { _id, role } = isValid
    req.session.user = { _id, username, role }
    console.log({ session: req.session })
    token = signAuthToken({ _id, username, role })
    res.json({ token })
  } else {
    res.status(401).json({ error: 'Invalid credentials' })
  }

}

export default login