import { PropsWithChildren } from 'react'
import { Button } from 'semantic-ui-react'
import { H1 } from '../basic-html/Headers'
import { useAuth } from '../../util/AuthContext';
import Loading from '../helpers/Loading';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getUser } from '../../react-query/getUser';
import ApiService from '../../util/ApiService';

export interface UserDetailsProps extends PropsWithChildren {
  // user: User
}

const UserDetails = (props: UserDetailsProps) => {
  const auth = useAuth()
  const { userId } = useParams()
  const { data, refetch } = useQuery(['user', userId], () => getUser(userId || ''))

  let user = data?.user
  let isAdmin = user?.role === 'admin'

  const toggleAdmin = useMutation(async () => {
    let request = user?.role === 'admin' ? ApiService.get<{ admin: string | false }>(`/auth/users/${userId}/revoke-admin`) : ApiService.get<{ admin: string | false }>(`/auth/users/${userId}/create-admin`)
    return request.then(() => refetch())
  })

  return !user ? <Loading /> : (
    <>
      <H1>{user.username}</H1>
      {auth?.role === 'admin' && <Button onClick={() => toggleAdmin.mutate()}>{isAdmin ? 'revoke' : 'grant'} admin status</Button>}
    </>
  )
}

UserDetails.defaultProps = {
}

export default UserDetails