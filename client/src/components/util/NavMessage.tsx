import React, { PropsWithChildren } from 'react'
import { useLocation } from 'react-router-dom'

export interface NavMessageProps extends PropsWithChildren {

}

const NavMessage = ({ children }: NavMessageProps) => {
  const location = useLocation()
  const { navMessage } = location?.state || {}
  return navMessage && <div className='nav-message'>{navMessage}</div>
}

NavMessage.defaultProps = {
}

export default NavMessage