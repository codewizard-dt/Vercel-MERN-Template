import CodeDoc, { CodeDocProps } from './CodeDoc';

interface FunctionDocProps extends CodeDocProps {
  params?: [string, string][]
  returns: string
}

const FunctionDoc = ({ children, ...codeDocProps }: FunctionDocProps) => {
  if (!codeDocProps.params) codeDocProps.params = []
  return (
    <CodeDoc className='method-doc' {...codeDocProps}>
      {children}
    </CodeDoc>
  )
}

export default FunctionDoc