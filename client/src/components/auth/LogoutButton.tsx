import { useLogout } from '../../api/auth/context';
const LogoutButton = () => {
  const logout = useLogout()
  return (
    <button onClick={logout}>
      LogoutButton
    </button>
  )
}

export default LogoutButton