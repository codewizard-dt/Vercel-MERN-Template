import { Segment } from "semantic-ui-react"
import { H2, H3 } from "../components/basic-html/Headers"
import C from "../components/helpers/code/InlineCode"
import ClassDoc from "./ClassDoc"
import CodeDoc from "./CodeDoc"
import ComponentDoc from "./ComponentDoc"
import FunctionDoc from "./FunctionDoc"

const Authentication = () => {
  return (
    <Segment>
      <H2>Authentication and Authorization</H2>
      <H3 italic>Helper Class</H3>
      <ClassDoc type="Class" labels={['frontend']} filePath="client/src/util/AuthContext.tsx" name="AuthService" extendedName="TokenService<AuthToken>" constructorInfo={{ description: '' }} stringLiteral={literals.authService}
        methods={[
          { name: 'checkHeader', type: 'instance', description: 'Handles the auth token', returns: 'void' },
          { name: 'touch', type: 'instance', description: 'Pings the server for auth token validation', returns: 'void' },
          { name: 'login', params: [['credentials', 'Credentials']], type: 'async instance', description: 'Submits credentials for authentication and starts a session if valid', returns: 'AuthResponse' },
          { name: 'logout', type: 'async instance', description: 'Invalidates user session', returns: 'AuthResponse' },
          { name: 'register', params: [['credentials', 'RegisterCredentials']], type: 'async instance', description: 'Submits credentials and creates a new User and session if valid', returns: 'AuthResponse' },
        ]}
        properties={[

        ]}>
        <div className="description">Provides authentication and authorization methods</div>
      </ClassDoc>
      <H3 italic>Components</H3>
      <ComponentDoc name="AuthProvider" filePath="client/src/util/AuthContext.tsx" type="Component" stringLiteral={literals.authProvider}>
        <div className="description">Shares authentication and authorization status to all child components using the <C>AuthService</C> class behind the scenes to manage the token and session<div className="detail">Provided by default in <C>App.tsx</C> </div></div>
      </ComponentDoc>
      <H3 italic>Hooks</H3>

      <FunctionDoc name='useAuth()' returns="AuthToken | null" type="Hook" filePath="client/src/util/AuthContext.tsx" stringLiteral={literals.useAuth}>
        <div className="description">A hook that returns <C>AuthContext.user</C>. Always up to date because the AuthService checks headers on every request</div>
      </FunctionDoc>
    </Segment>
  )
}

const literals = {
  authService: `import ApiService from './ApiService';
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

  async touch() {
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
`,
  authProvider: `import { PropsWithChildren, useContext, useEffect, useState } from 'react'

interface AuthContextI {
  token: string | null
  user: AuthToken | null
  authMethods: AuthService
}
export const AuthMethods = new AuthService() // also in ./AuthContext.tsx
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

`,
  useAuth: `import { createContext, useContext } from 'react'
export type AuthRole = 'user' | 'admin'
interface AuthToken {
  _id: string
  username: string
  role: AuthRole
}

interface AuthContextI {
  token: string | null
  user: AuthToken | null
  authMethods: AuthService
}

export const AuthContext = createContext<AuthContextI>({
  token: null, // initial token
  user: null, // initial user
  authMethods: AuthMethods // TokenService
})

export const useAuth = () => useContext(AuthContext).user
`
}

export default Authentication