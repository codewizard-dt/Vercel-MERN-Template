import React, { PropsWithChildren } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../util/AuthContext';

export interface AuthGuardProps extends PropsWithChildren {
  type: 'user' | 'guest'
}

const AuthGuard = ({ children, type }: AuthGuardProps) => {
  const token = useAuth()
  const { state, pathname } = useLocation()
  const url = state?.from ? state.from : '/'
  if (type === 'user') {
    return token ? <Outlet /> : <Navigate to="/login" state={{ from: pathname, navMessage: 'Please login to see that page' }} />
  } else {
    return !token ? <Outlet /> : <Navigate to={url} />
  }
}

export default AuthGuard