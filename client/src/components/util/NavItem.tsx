import { PropsWithChildren, useEffect, useState } from 'react'
import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom'
import { MenuItem, MenuItemProps } from 'semantic-ui-react'

export interface NavItemProps extends MenuItemProps {
  to: string
  stretch?: 'before' | 'after' | 'self'
}

const NavItem = ({ to, stretch, ...menuItemProps }: NavItemProps) => {
  const { pathname } = useLocation()
  const [active, setActive] = useState<boolean>(false)
  useEffect(() => {
    setActive(pathname === to)
  }, [pathname])
  const getClassNames = () => {
    let classNames = []
    if (active) classNames.push('active')
    if (menuItemProps.className) classNames.push(menuItemProps.className.split(' '))
    return classNames.length ? classNames.join(' ') : undefined
  }
  return (
    <Link to={to} className={stretch === 'self' ? 'stretch' : undefined}>
      <MenuItem as='div'  {...menuItemProps} className={getClassNames()} />
    </Link>
  )

}

export default NavItem