import { PropsWithChildren } from 'react'
import { HeaderSubheader, Segment } from 'semantic-ui-react'
import { H1 } from '../components/basic-html/Headers'
import { useAuth } from '../util/AuthContext'

export interface DashboardProps extends PropsWithChildren {

}

const Dashboard = ({ children }: DashboardProps) => {
  const auth = useAuth()
  return (
    <Segment basic textAlign='left'>
      <H1 >Hi, {auth?.username} <HeaderSubheader>It's your dashboard</HeaderSubheader></H1>
    </Segment>
  )

}

Dashboard.defaultProps = {
}

export default Dashboard
