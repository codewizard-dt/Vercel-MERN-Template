import { PropsWithChildren, ReactNode } from 'react'
import CodeDoc from './CodeDoc'
import { CodeDocProps } from './CodeDoc';

interface HookDocProps extends CodeDocProps {
  returns: string
  params: [string, string][]
  children: ReactNode
}

const HookDoc = ({ returns, params, children, ...codeDocProps }: HookDocProps) => {
  return (
    <CodeDoc {...codeDocProps}>{children}</CodeDoc>
  )
}

export default HookDoc