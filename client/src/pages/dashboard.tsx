import React, { PropsWithChildren } from 'react'

export interface DashboardProps extends PropsWithChildren {

}

const Dashboard = ({ children }: DashboardProps) => {
  return (
    <div>Dashboard</div>
  )
}

Dashboard.defaultProps = {
}

export default Dashboard