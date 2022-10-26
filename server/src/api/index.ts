import { Router } from "express";
import authRouter from "./auth";
import hello from "./hello";

const apiRouter = Router()

apiRouter.get('/hello', hello)
apiRouter.use('/auth', authRouter)

export default apiRouter