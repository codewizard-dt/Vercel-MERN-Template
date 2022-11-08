import { SessionData } from 'express-session'

interface UserSession {
  _id: string
  username: string
  role: 'admin' | 'user'
}
type User = UserSession | null

declare global {
  namespace Express {
    interface Request {
      user: User
    }
  }
}

declare module "express-session" {
  interface SessionData {
    user: User
  }
}

// export { }