import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Message, Segment } from 'semantic-ui-react';
import { useAuth, useAuthMethods } from '../../util/AuthContext'
import BackButton from '../util/buttons/BackButton';

export interface RoleGuardProps {
  type: 'user' | 'admin'
  redirect?: string
}

const RoleGuard = ({ type, redirect = "/" }: RoleGuardProps) => {
  const user = useAuth()
  const auth = useAuthMethods()
  useEffect(() => {
    auth.touch()
  }, [auth])
  return user?.role === type ? <Outlet /> : (
    <Segment basic textAlign='center' >
      <Message negative>Restricted {type} area</Message>
      <BackButton />
    </Segment>
  )
}

export default RoleGuard