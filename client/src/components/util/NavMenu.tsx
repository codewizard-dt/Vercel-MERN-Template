import { Menu, MenuItem, MenuProps } from 'semantic-ui-react'
import NavItem, { NavItemProps } from './NavItem'
import './NavMenu.sass'

export interface NavMenuProps {
  items: Partial<NavItemProps>[]
  options?: MenuProps
}

const NavMenu = ({ items = [], options = {} }: NavMenuProps) => {
  return (
    <nav>
      <Menu items={items.map(
        ({ to, stretch, ...itemProps }, i) => {
          const classes = () => {
            let arr = []
            if (itemProps.className) arr.push(...itemProps.className.split(' '))
            if (stretch === 'self') arr.push('stretch')
            return arr.join(' ')
          }
          return <>
            {stretch === 'before' && <MenuItem className='stretch' />}
            {to
              ? <NavItem key={i} to={to} {...itemProps} />
              : <MenuItem key={i} className={classes()} {...itemProps} />}
            {stretch === 'after' && <MenuItem className='stretch' />}
          </>
        }
      )} {...options} />
    </nav>
  )
}

export default NavMenu