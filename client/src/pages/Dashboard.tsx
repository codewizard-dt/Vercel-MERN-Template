import { PropsWithChildren } from 'react'
import { Segment } from 'semantic-ui-react'
import { H1 } from '../components/basic-html/Headers'

export interface DashboardProps extends PropsWithChildren {

}

const Dashboard = ({ children }: DashboardProps) => {
  // const auth = useAuth()
  // const { data: user } = useQuery(['profile'], () => ApiService.get('/auth/profile'))
  return (
    <Segment basic textAlign='left'>
      <H1 />
    </Segment>
  )

}

Dashboard.defaultProps = {
}

export default Dashboard
