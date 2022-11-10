import hljs from 'highlight.js'
import { PropsWithChildren, useEffect, useRef } from 'react'

export interface CodeProps extends PropsWithChildren {
  json?: { [key: string]: any }
}
const C = ({ children, json }: CodeProps) => {
  return (
    <span className='code-block inline' >
      {json && JSON.stringify(json, null, 2)}
      {children}
    </span>
  )
}

export default C