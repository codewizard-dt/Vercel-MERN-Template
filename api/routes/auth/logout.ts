import { RequestHandler } from "express";

const logout: RequestHandler = async (req, res) => {
  req.session.destroy(() => {
    res.removeHeader('Authorization')
    res.json({ token: null })
  })
}
export default logout