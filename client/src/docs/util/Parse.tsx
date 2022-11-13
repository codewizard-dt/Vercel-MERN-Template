import { ReactNode } from "react"
import { CodeDocProps } from "../CodeDoc"

const typeAnnotationRegex = new RegExp(/(<.*>)$/)

export const parseTypeAnnotation = (value: string): ReactNode => {
  let typeAnnotation = value.match(typeAnnotationRegex)
  if (!typeAnnotation) return value

  else {
    let typedValue = <span>
      {value.replace(typeAnnotationRegex, '')}
      <span className='type-annotation'>{typeAnnotation[1]}</span>
    </span>
    return typedValue
  }
}
export const stripTypeAnnotation = (value: string): string => {
  return value.replace(typeAnnotationRegex, '')
}

export const getFullName = ({ name, extendedName, params, returns }: Pick<CodeDocProps, 'name' | 'extendedName' | 'params' | 'returns'>): ReactNode => {
  let typedName = parseTypeAnnotation(name)
  if (extendedName) {
    return <>
      {typedName}{extendedName && <> <span className='extends'>extends</span> {parseTypeAnnotation(extendedName)}</>}
    </>
  } else if (returns) {
    return <>
      {typedName}{params && <span className='params'>({params.map(([param, type], i) => <span key={i}><b>{param}</b><span className="param-type-annotation">{`: ${type}`}</span></span>)})</span>}<span className="returns">: {parseTypeAnnotation(returns)}</span>
    </>
  } else {
    return typedName
  }

}
