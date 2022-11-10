import CodeDoc, { CodeDocProps } from './CodeDoc';

interface FunctionDocProps extends CodeDocProps {
  params?: [string, string][]
  returns: string
}

const FunctionDoc = ({ children, ...codeDocProps }: FunctionDocProps) => {
  return (
    <CodeDoc {...codeDocProps}>
      {children}
    </CodeDoc>
  )
}

export default FunctionDoc