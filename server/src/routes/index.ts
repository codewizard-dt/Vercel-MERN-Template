import { Router } from "express";
import login from "./login";

const authRouter = Router()

authRouter.post('/login', login)

export default authRouter