import { decodeToken, signToken } from './token';

export interface AuthTokenContents {
  _id: string
  username: string
  role: 'user' | 'admin'
}

export const signAuthToken = signToken<AuthTokenContents>
export const decodeAuthToken = decodeToken<AuthTokenContents>
