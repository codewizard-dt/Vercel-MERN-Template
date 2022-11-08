import { RequestHandler } from "express";
import User from "../../models/User";

const profile: RequestHandler = async (req, res) => {
  let user = await User.findById(req.session.user?._id)
  res.json(user?.toObject())
}

export default profile