import React, { PropsWithChildren } from 'react'
import { useQuery } from 'react-query'
import { NavLink } from 'react-router-dom'
import { Button, Container } from 'semantic-ui-react'
import Code from '../components/util/code/Code'
import ApiService from '../util/ApiService'
import { useAuth } from '../util/AuthContext'

export interface DashboardProps extends PropsWithChildren {

}

const Dashboard = ({ children }: DashboardProps) => {
  const auth = useAuth()
  const { data } = useQuery(['profile'], () => ApiService.get('/auth/profile'))
  return (
    <Container>
      {auth?.role === 'admin' && <NavLink to="/admin/dashboard">
        <Button>Admin View</Button>
      </NavLink>}
      <Code json={data} />

    </Container>
  )

}

Dashboard.defaultProps = {
}

export default Dashboard