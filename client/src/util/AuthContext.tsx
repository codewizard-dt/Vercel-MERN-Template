import { ApiResponse } from '@codewizard-dt/use-form-hook';
import React, { PropsWithChildren, useContext, useState } from 'react'
import { createContext } from "react";
import axiosApi from './AxiosApi';
import { TokenService } from './TokenService';


interface Credentials {
  username: string
  password: string
}
interface RegisterCredentials extends Credentials {
  email: string
}

class AuthService extends TokenService {
  constructor(public tokenName: string = 'auth-token') {
    super(tokenName)
  }
  async login(credentials: Credentials) {
    return axiosApi.post('/auth/login', credentials).then(({ data }) => {
      this.setToken(data?.token)
      return data
    })
  }
  logout() {
    this.setToken(null)
  }
  async register(credentials: RegisterCredentials) {
    return axiosApi.post('/auth/register', credentials).then(({ data }) => {
      this.setToken(data?.token)
      return data
    })
  }
}

interface AuthContextI {
  token: string | null
  login: (data: Credentials) => Promise<ApiResponse<string | null>>
  register: (data: RegisterCredentials) => Promise<ApiResponse<string | null>>
  logout: () => void
  authMethods: AuthService
}
export const AuthMethods = new AuthService()
export const AuthContext = createContext<AuthContextI>({
  token: null, // initial token
  login: async (data) => ({ data: '' }) as ApiResponse<string | null>, // login placeholder
  register: async (data) => ({ data: '' }) as ApiResponse<string | null>, // register placeholder
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
    let token = await AuthMethods.login(data)
    if (token) setToken(token)
    return token
  }
  const register = async (data: RegisterCredentials) => {
    let token = await AuthMethods.register(data)
    console.log(token)
    if (token && !token.errors) setToken(token)
    return token
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

