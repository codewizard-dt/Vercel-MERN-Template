import jwtDecode from "jwt-decode";
import { BehaviorSubject } from "rxjs";

export class TokenService<T> {
  constructor(public tokenName: string) { }
  token = new BehaviorSubject<string | null>(this.getToken())
  payload = new BehaviorSubject<T | null>(this.getPayload())

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
    if (token) {
      localStorage.setItem(this.tokenName, token)
    } else {
      localStorage.removeItem(this.tokenName)
    }
    this.token.next(token)
    this.payload.next(this.getPayload())
    return token
  }
  getPayload(): T | null {
    try {
      let token = this.getToken()
      if (!token) return null
      const { data } = jwtDecode<{ data: T }>(token)
      return data
    } catch (error) {
      console.log(error)
      this.setToken(null)
      return null
    }
  }
}
