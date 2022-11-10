import { PropsWithChildren } from 'react'
import { Header, HeaderProps as HeaderPropsUI } from 'semantic-ui-react'

interface HeaderProps extends HeaderPropsUI, PropsWithChildren {
  italic?: boolean
}
function getClassName({ className, italic }: HeaderProps): string | undefined {
  let arr = []
  if (className) arr.push(className)
  if (italic) arr.push('italic')
  return arr.length ? arr.join(' ') : undefined
}
export const H1 = (props: HeaderProps) => {
  let { className, italic, children, ...headerProps } = props
  return <Header as='h1' className={getClassName(props)} {...headerProps}>{children}</Header>
}
export const H2 = (props: HeaderProps) => {
  let { className, italic, children, ...headerProps } = props
  return <Header as='h2' className={getClassName(props)} {...headerProps}>{children}</Header>
}
export const H3 = (props: HeaderProps) => {
  let { className, italic, children, ...headerProps } = props
  return <Header as='h3' className={getClassName(props)} {...headerProps}>{children}</Header>
}
export const H4 = (props: HeaderProps) => {
  let { className, italic, children, ...headerProps } = props
  return <Header as='h4' className={getClassName(props)} {...headerProps}>{children}</Header>
}
export const H5 = (props: HeaderProps) => {
  let { className, italic, children, ...headerProps } = props
  return <Header as='h5' className={getClassName(props)} {...headerProps}>{children}</Header>
}
