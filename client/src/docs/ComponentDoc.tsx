import { PropsWithChildren, ReactNode } from 'react'
import Code from '../components/helpers/code/Code';
import CodeDoc, { CodeDocProps } from './CodeDoc';

interface ComponentDocProps extends CodeDocProps, PropsWithChildren {
  props?: { name: string, type: string, optional?: boolean }[]
  children?: ReactNode
}

const ComponentDoc = ({ props = [], children, ...codeDocProps }: ComponentDocProps) => {

  return (
    <CodeDoc {...codeDocProps}>
      {children}
      {props.length > 0 && <Code json={props} />}
    </CodeDoc>
  )
}

export default ComponentDoc