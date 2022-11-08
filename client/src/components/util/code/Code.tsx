import { PropsWithChildren } from 'react'
import "./Code.sass"

export interface CodeProps extends PropsWithChildren {
  json?: { [key: string]: any }
}
const Code = ({ children, json }: CodeProps) => {
  return (
    <pre className='code-block'>
      {json && JSON.stringify(json, null, 2)}
      {children}
    </pre>
  )
}

Code.defaultProps = {
}

export default Code