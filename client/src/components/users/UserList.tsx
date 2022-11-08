import { List } from "semantic-ui-react"
import { User } from "./User"
import UserListItem from "./UserListItem"

export interface UserListProps {
  users?: User[]
}

const UserList = ({ users }: UserListProps) => {
  return (
    <List>
      {users && users.map((user, i) => <UserListItem key={i} user={user} />)}
    </List>
  )
}

UserList.defaultProps = {
}

export default UserList