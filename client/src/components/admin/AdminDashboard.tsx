import { useQuery } from "react-query"
import { getUsers } from "../../react-query/getUsers"
import UserList from "../users/UserList"
import Loading from "../helpers/Loading"

const AdminDashboard = () => {
  const { data, isLoading } = useQuery(['users',], getUsers)
  let users = data?.users
  return (
    isLoading ? <Loading message="Loading users" /> :
      <UserList users={users} />
  )
}

export default AdminDashboard