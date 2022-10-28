import { PropsWithChildren } from 'react'
import { Header } from 'semantic-ui-react'

export const H1 = ({ children }: PropsWithChildren) => <Header as='h1'>{children}</Header>
export const H2 = ({ children }: PropsWithChildren) => <Header as='h2'>{children}</Header>
export const H3 = ({ children }: PropsWithChildren) => <Header as='h3'>{children}</Header>
export const H4 = ({ children }: PropsWithChildren) => <Header as='h4'>{children}</Header>
export const H5 = ({ children }: PropsWithChildren) => <Header as='h5'>{children}</Header>
