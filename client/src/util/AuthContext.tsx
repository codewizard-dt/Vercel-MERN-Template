import { ApiResponse } from '@codewizard-dt/use-form-hook';
import React, { PropsWithChildren, useContext, useState } from 'react'
import { createContext } from "react";
import axiosApi from './AxiosApi';
import { TokenService } from './TokenService';

export type AuthRole = 'user' | 'admin'
interface AuthToken {
  _id: string
  username: string
  role: AuthRole
}

interface Credentials {
  username: string
  password: string
}
interface RegisterCredentials extends Credentials {
  email: string
}
type AuthResponse = { token: string | null }

class AuthService extends TokenService<AuthToken>{
  constructor(public tokenName: string = 'auth-token') {
    super(tokenName)
  }
  async login(credentials: Credentials) {
    return axiosApi.post<AuthResponse>('/auth/login', credentials).then(res => {
      if (res.data) this.setToken(res.data.token)
      return res
    })
  }
  logout() {
    this.setToken(null)
  }
  async register(credentials: RegisterCredentials) {
    return axiosApi.post<AuthResponse>('/auth/register', credentials).then(res => {
      if (res.data) this.setToken(res.data.token)
      return res
    })
  }
  getRole(): AuthRole | null {
    let data = this.getPayload()
    if (!data) return null
    return data.role
  }
}

interface AuthContextI {
  token: string | null
  login: (data: Credentials) => Promise<ApiResponse<AuthResponse>>
  register: (data: RegisterCredentials) => Promise<ApiResponse<AuthResponse>>
  logout: () => void
  authMethods: AuthService
}
export const AuthMethods = new AuthService()
export const AuthContext = createContext<AuthContextI>({
  token: null, // initial token
  login: async (data) => ({}), // login placeholder
  register: async (data) => ({}), // register placeholder
  logout: () => { }, // logout placeholder
  authMethods: AuthMethods // TokenService
})

export const useAuth = () => useContext(AuthContext).token
export const useLogin = () => useContext(AuthContext).login
export const useRegister = () => useContext(AuthContext).register
export const useLogout = () => useContext(AuthContext).logout
export const useAuthMethods = () => useContext(AuthContext).authMethods

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState(AuthMethods.getToken())
  const login = async (data: Credentials) => {
    let res = await AuthMethods.login(data)
    if (res.data) setToken(res.data.token)
    return res
  }
  const register = async (data: RegisterCredentials) => {
    let res = await AuthMethods.register(data)
    if (res.data) setToken(res.data.token)
    return res
  }

  const logout = () => {
    AuthMethods.logout()
    setToken(null)
  }
  return <AuthContext.Provider value={{ token, login, register, logout, authMethods: AuthMethods }}>
    {children}
  </AuthContext.Provider>
}

export default AuthProvider

