import React, { PropsWithChildren, useState } from 'react'
import { useAuth, useAuthMethods } from '../../api/auth/context'

export interface LoginProps extends PropsWithChildren {

}

const Login = ({ children }: LoginProps) => {
  // eslint-disable-next-line
  const [token, setToken] = useAuth()
  const auth = useAuthMethods()
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const handleChange = ({ target: { name, value } }: { target: HTMLInputElement }) => {
    setCredentials({
      ...credentials,
      [name]: value
    })
  }
  const handleSubmit = async (ev: { preventDefault: () => void }) => {
    ev.preventDefault()
    let result = await auth.login(credentials)
    setToken(result)
    console.log(result)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="fields">
        <label>Username</label>
        <input name='username' type='text' value={credentials.username} onChange={handleChange} />
        <label>Password</label>
        <input name='password' type='password' value={credentials.password} onChange={handleChange} />
      </div>
      <button>Login</button>
    </form>
  )
}

Login.defaultProps = {
}

export default Login