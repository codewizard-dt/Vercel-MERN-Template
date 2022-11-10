import { PropsWithChildren } from 'react'

export interface ExternalLinkProps extends PropsWithChildren {
  to: string
}

const ExternalLink = ({ to, children }: ExternalLinkProps) => <a href={to} rel="noreferrer" target="_blank">{children}</a>

export default ExternalLink