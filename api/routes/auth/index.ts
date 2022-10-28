import { Router } from "express";
import { catchError } from "../errors/catchError";
import login from "./login";
import register from "./register";

const authRouter = Router()

authRouter.post('/login', catchError(login))
authRouter.post('/register', catchError(register))

export default authRouter