import { Button } from 'semantic-ui-react';
import { useAuthMethods } from '../../util/AuthContext';
// import { useLogout } from '../../util/AuthContext';
const LogoutButton = () => {
  const auth = useAuthMethods()
  return (
    <Button onClick={() => auth.logout()}>
      Logout
    </Button>
  )
}

export default LogoutButton