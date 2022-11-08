import { decode, verify, sign } from 'jsonwebtoken'

const secret = process.env.APP_SECRET || 'mysecretssshhhhhhh';
const expiration = process.env.MAX_TOKEN_AGE || '1w';

export function signToken<T>(payload: T) {
  return sign({ data: payload }, secret, { expiresIn: expiration });
}
export function decodeToken<T>(token: string): T | null {
  if (verify(token, secret)) {
    let decoded = decode(token)
    if (!decoded) return null
    return typeof decoded === 'string' ? JSON.parse(decoded) : decoded.data
  } else return null
}