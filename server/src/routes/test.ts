import { RequestHandler } from "express";

const test: RequestHandler = async (req, res) => {
  res.json({ message: 'hello' })
}

export default test