import React, { PropsWithChildren } from 'react'

export interface NavBarProps extends PropsWithChildren {

}

const NavBar = ({ children }: NavBarProps) => {
  return (
    <div>NavBar</div>
  )
}

NavBar.defaultProps = {
}

export default NavBar