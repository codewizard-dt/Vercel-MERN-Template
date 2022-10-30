import React, { PropsWithChildren } from 'react'
import { useLocation } from 'react-router-dom'
import { Message, Segment } from 'semantic-ui-react'

export interface NavMessageProps extends PropsWithChildren {

}

const NavMessage = ({ children }: NavMessageProps) => {
  const location = useLocation()
  const { navMessage } = location?.state || {}
  return navMessage && <Segment basic content={<Message content={navMessage} />} />
}

NavMessage.defaultProps = {
}

export default NavMessage