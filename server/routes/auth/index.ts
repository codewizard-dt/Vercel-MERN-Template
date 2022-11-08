import { Router } from "express";
import { verifyAuth, requireAdmin, requireAuth } from '../../middleware/auth';
import { catchError } from "../errors/catchError";
import login from "./login";
import logout from "./logout";
import profile from "./profile";
import register from "./register";
import { createAdmin, revokeAdmin } from './roles';

const authRouter = Router()

authRouter.get('/touch', (req, res) => {
  res.json(true)
})
authRouter.post('/login', catchError(login))
authRouter.get('/logout', catchError(logout))
authRouter.post('/register', catchError(register))
authRouter.get('/profile', requireAuth, catchError(profile))
authRouter.get('/users/:userId/create-admin',
  // verifyAuth, requireAdmin, 
  catchError(createAdmin)
)
authRouter.get('/users/:userId/revoke-admin',
  // verifyAuth, requireAdmin, 
  catchError(revokeAdmin)
)

export default authRouter