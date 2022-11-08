import { PropsWithChildren } from 'react'
import { NavLink } from 'react-router-dom'
import { ListItem } from 'semantic-ui-react'
import { User } from './User'

export interface UserListItemProps extends PropsWithChildren {
  user: User
}

const UserListItem = ({ user }: UserListItemProps) => {
  return (
    <NavLink to={`/users/${user._id}`}>
      <ListItem>
        {user.username}
      </ListItem>
    </NavLink>
  )
}

UserListItem.defaultProps = {
}

export default UserListItem