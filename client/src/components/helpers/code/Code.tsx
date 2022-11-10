import hljs from 'highlight.js';
import { PropsWithChildren, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button, Header, ModalHeader } from 'semantic-ui-react';
import { H3 } from '../../basic-html/Headers';
import Modal from '../Modal';
import "./Code.sass"
import C from './InlineCode';
import { parseTypeAnnotation } from '../../../docs/util/Parse';

export interface CodeProps extends PropsWithChildren {
  json?: { [key: string]: any }
  modalTrigger?: ReactNode
  name?: ReactNode,
  filePath?: string,
  stringLiteral?: string
  language?: string
  noHighlight?: boolean
  className?: string
}

const Code = ({ stringLiteral, modalTrigger, json, name, filePath, language = 'typescript', noHighlight, className, children }: CodeProps) => {
  let eleRef = useRef<HTMLElement | null>(null)

  const highlight = () => {
    if (eleRef.current && !eleRef.current.classList.contains('hljs')) {
      hljs.highlightElement(eleRef.current)
    }
  }
  useEffect(() => {
    if (eleRef.current) highlight()
  }, [eleRef.current])

  const getClassName = () => {
    let arr = []
    if (language) arr.push(`language-${language}`)
    if (noHighlight) arr.push('nohighlight')
    if (className) arr.push(...className.split(' '))
    return arr.length ? arr.join(' ') : undefined
  }
  // if (name) console.log(parseTypeAnnotation(name))
  const PRE = () => (<>
    {name && <H3>{name}{filePath && <Header.Subheader>{filePath}</Header.Subheader>}</H3>}
    <pre className='code-block' >
      <code className={getClassName()} ref={eleRef}>
        {json && JSON.stringify(json, null, 2)}
        {stringLiteral}
        {children}
      </code>
    </pre>
  </>

  )
  if (modalTrigger) return (
    <Modal onOpen={highlight} trigger={modalTrigger} >
      {PRE()}
    </Modal>
  )
  return PRE()
}

Code.defaultProps = {
}

export default Code