import { useQuery, useQueryClient } from "react-query"
import { getUsers } from "../../fetch/getUsers"
import UserList from "../users/UserList"
import Loading from "../util/Loading"

const AdminDashboard = () => {
  // const queryClient = useQueryClient()
  const { data, isLoading } = useQuery(['users',], getUsers)
  // if (!data) return <></>
  let users = data?.users
  return (
    isLoading ? <Loading message="Loading users" /> :
      <UserList users={users} />
  )
}

export default AdminDashboard