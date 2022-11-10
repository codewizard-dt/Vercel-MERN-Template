import { Fragment } from 'react'
import { Menu, MenuItem, MenuProps } from 'semantic-ui-react'
import NavItem, { NavItemProps } from './NavItem'
import './NavMenu.sass'

export interface NavMenuProps {
  /**
   * @param {Partial<NavItemProps>[]} items array of NavItemProps objects
   * @description Shorthand format for defining MenuItem components, with or without a `to` param. Including `to` will make it a link, while leaving it out will render a plain MenuItem. The `stretch` param is an enum `'before'|'after'|'self'`, which will add `flex-grow: 1` to an element. If `stretch === 'self'`, the MenuItem itself will grow, otherwise a separate element will be added `'before' or 'after'` to take up the space. Also accepts any of the `MenuItem` props from Semantic UI React
   */
  items: Partial<NavItemProps>[]
  /**
   * @param {MenuProps} options an object defining the MenuProps from Semantic UI React
   */
  options?: MenuProps
}

/**
 * @description 
 * @param {object} props array of NavItemProps objects
 * {
 *    items: array of objects
 *    options: 
 * }
 * @returns A navigation menu
 */
const NavMenu = ({ items = [], options = {} }: NavMenuProps) => {
  return (
    <nav className='nav-menu'>
      <Menu items={items.map(
        ({ to, stretch, ...itemProps }, i) => {
          const classes = () => {
            let arr = []
            if (itemProps.className) arr.push(...itemProps.className.split(' '))
            if (stretch === 'self') arr.push('stretch')
            return arr.join(' ')
          }
          return <Fragment key={i}>
            {stretch === 'before' && <MenuItem className='stretch' />}
            {to
              ? <NavItem to={to} {...itemProps} />
              : <MenuItem className={classes()} {...itemProps} />}
            {stretch === 'after' && <MenuItem className='stretch' />}
          </Fragment>
        }
      )} {...options} />
    </nav>
  )
}

export default NavMenu