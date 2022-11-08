import { decodeToken, signToken } from './token';

export interface AuthTokenContents {
  _id: string
  username: string
  role: 'user' | 'admin'
}

export const signAuthToken = (user: AuthTokenContents) => signToken<AuthTokenContents>(user)
export const decodeAuthToken = decodeToken<AuthTokenContents>
