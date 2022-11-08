import { PropsWithChildren } from 'react'
import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Button, Message, Segment } from 'semantic-ui-react';
import { useAuth } from '../../util/AuthContext';
import BackButton from '../util/buttons/BackButton';

export interface AuthGuardProps extends PropsWithChildren {
  type: 'user' | 'guest'
}

const AuthGuard = ({ children, type }: AuthGuardProps) => {
  const token = useAuth()
  const { state, pathname } = useLocation()
  const url = state?.from ? state.from : '/'
  if (type === 'user') {
    if (token) return <Outlet />
    else {
      return <Segment basic textAlign='center' >
        <Message positive>Must be logged in to see this page</Message>
        <NavLink to="/login" state={{ from: pathname }}>
          <Button color='green'>Login</Button>
        </NavLink>
        <BackButton />
      </Segment>

    }
  } else {
    return !token ? <Outlet /> : <Navigate to={url} replace />
  }
}

export default AuthGuard