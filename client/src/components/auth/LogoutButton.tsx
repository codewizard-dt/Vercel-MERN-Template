import { Button } from 'semantic-ui-react';
import { useLogout } from '../../util/AuthContext';
const LogoutButton = () => {
  const logout = useLogout()
  return (
    <Button onClick={logout}>
      Logout
    </Button>
  )
}

export default LogoutButton