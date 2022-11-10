import { AxiosResponse } from 'axios';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import ApiService from './ApiService';
import { TokenService } from './TokenService';

export type AuthRole = 'user' | 'admin'
interface AuthToken {
  _id: string
  username: string
  role: AuthRole
}

export interface Credentials {
  username: string
  password: string
}
export interface RegisterCredentials extends Credentials {
  email: string
}
type AuthResponse = { token: string | null }

class AuthService extends TokenService<AuthToken>{
  constructor(public tokenName: string = 'auth-token') {
    super(tokenName)
    ApiService.interceptors.response.use(this.checkHeader)
  }

  checkHeader = (response: AxiosResponse) => {
    let auth = response.headers['authorization']
    if (auth) {
      this.setToken(auth)
    }
    return response
  }

  touch() {
    ApiService.get('/auth/touch')
  }
  async login(credentials: Credentials) {
    return ApiService.post<AuthResponse>('/auth/login', credentials).then(res => {
      if (res.token) this.setToken(res.token)
      return res
    })
  }
  async logout() {
    return ApiService.get<AuthResponse>('/auth/logout').then(res => {
      if (res.token === null) this.setToken(res.token)
      return res
    })
  }
  async register(credentials: RegisterCredentials) {
    return ApiService.post<AuthResponse>('/auth/register', credentials).then(res => {
      if (res.token) this.setToken(res.token)
      return res
    })
  }
}

interface AuthContextI {
  token: string | null
  user: AuthToken | null
  authMethods: AuthService
}
export const AuthMethods = new AuthService()
export const AuthContext = createContext<AuthContextI>({
  token: null, // initial token
  user: null, // initial user
  authMethods: AuthMethods // TokenService
})

export const useAuth = () => useContext(AuthContext).user
export const useAuthMethods = () => useContext(AuthContext).authMethods

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState(AuthMethods.getToken())
  const [user, setUser] = useState(AuthMethods.getPayload())
  useEffect(() => {
    let token = AuthMethods.token.subscribe((value) => { setToken(value) })
    let user = AuthMethods.payload.subscribe(value => setUser(value))
    return () => {
      token.unsubscribe()
      user.unsubscribe()
    }
  }, [])

  return <AuthContext.Provider value={{ token, user, authMethods: AuthMethods }}>
    {children}
  </AuthContext.Provider>
}

export default AuthProvider

