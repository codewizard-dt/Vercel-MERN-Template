import React, { PropsWithChildren, useContext, useState } from 'react'
import { AxiosRequestHeaders } from "axios";
import { createContext } from "react";
import axiosApi from '../axios';
import jwtDecode from 'jwt-decode';


interface Credentials {
  username: string
  password: string
}


class Auth {
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

export const AuthService = new Auth()
export const AuthContext = createContext<[string | null, (token: string | null) => void, Auth]>([
  null, // initial token
  () => { }, // initial setter
  AuthService // auth methods
])
export const useAuth = (): [string | null, (token: string | null) => void] => {
  let [token, setToken] = useContext(AuthContext)
  return [token, setToken]
}
export const useAuthMethods = () => useContext(AuthContext)[2]

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState(AuthService.getToken())
  return <AuthContext.Provider value={[token, setToken, AuthService]}>
    {children}
  </AuthContext.Provider>
}

export default AuthProvider

