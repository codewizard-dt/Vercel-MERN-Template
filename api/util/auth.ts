import { decodeToken, signToken } from './token';

export interface AuthTokenContents {
  _id: string
  username: string
}

export const signAuthToken = signToken<AuthTokenContents>
export const decodeAuthToken = decodeToken<AuthTokenContents>
