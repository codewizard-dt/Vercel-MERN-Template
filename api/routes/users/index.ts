import { Router } from "express";
import { catchError } from "../errors/catchError";
import fetchUser from "./fetchUser";
import fetchUsers from "./fetchUsers";
import { requireAdmin, requireAuth } from '../../middleware/auth';

const usersRouter = Router()

usersRouter.get('/', requireAdmin, catchError(fetchUsers))
usersRouter.get('/:userId', requireAdmin, catchError(fetchUser))

export default usersRouter