import { decode, verify, sign } from 'jsonwebtoken'

const secret = process.env.APP_SECRET || 'mysecretssshhhhhhh';
const expiration = process.env.MAX_TOKEN_AGE || '1w';

export interface TokenContents {
  _id: string
  username: string
}

export function signToken({ username, _id }: TokenContents) {
  const payload = { username, _id };
  return sign({ data: payload }, secret, { expiresIn: expiration });
}
export function decodeToken(token: string): TokenContents | null {
  if (verify(token, secret)) {
    let decoded = decode(token)
    if (!decoded) return null
    else console.log({ decoded })
    return typeof decoded === 'string' ? JSON.parse(decoded) : decoded.data
  } else return null

}