import React, { PropsWithChildren, useContext, useState } from 'react'
import { AxiosRequestHeaders } from "axios";
import { createContext } from "react";
import axiosApi from '../axios';
import jwtDecode from 'jwt-decode';


interface Credentials {
  username: string
  password: string
}


class TokenService {
  constructor(public tokenName: string = 'auth-token') { }
  get isValid(): boolean {
    let token = this.getToken()
    if (!token) return false
    else {
      const { exp = 0 } = jwtDecode<{ exp?: Number }>(token);
      return exp < Date.now() / 1000
    }
  }
  getToken() {
    return localStorage.getItem(this.tokenName)
  }
  setToken(token: string | null) {
    if (token?.match('Bearer')) token = token.split(' ')[1]
    if (token) localStorage.setItem(this.tokenName, token)
    else localStorage.removeItem(this.tokenName)
    return token
  }
  checkResponse() { }
  addAuthHeader(headers: AxiosRequestHeaders) { }
  async login(credentials: Credentials) {
    return axiosApi.post('/auth/login', credentials).then(({ data }) => this.setToken(data?.token))
  }
}

interface AuthContextI {
  token: string | null
  login: (data: Credentials) => void
  logout: () => void
  authMethods: TokenService
}
export const AuthMethods = new TokenService()
export const AuthContext = createContext<AuthContextI>({
  token: null, // initial token
  login: async (data) => { }, // login placeholder
  logout: () => { }, // logout placeholder
  authMethods: AuthMethods // TokenService
})

export const useAuth = () => useContext(AuthContext).token
export const useLogin = () => useContext(AuthContext).login
export const useLogout = () => useContext(AuthContext).logout
export const useAuthMethods = () => useContext(AuthContext).authMethods

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState(AuthMethods.getToken())
  const login = async (data: Credentials) => {
    let token = await AuthMethods.login(data)
    if (token) setToken(token)
  }
  const logout = () => {
    setToken(null)
  }
  return <AuthContext.Provider value={{ token, login, logout, authMethods: AuthMethods }}>
    {children}
  </AuthContext.Provider>
}

export default AuthProvider

