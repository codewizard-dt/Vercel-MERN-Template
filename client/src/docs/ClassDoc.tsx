import { camelCase, upperFirst } from 'lodash';
import { ReactNode } from 'react';
import { List, Segment } from 'semantic-ui-react';
import { H4, H5 } from '../components/basic-html/Headers';
import Code from '../components/helpers/code/Code';
import CodeDoc, { CodeDocProps } from './CodeDoc';
import { parseTypeAnnotation, stripTypeAnnotation } from './util/Parse';

interface ClassConstructor {
  params?: { [key: string]: string }
  description: ReactNode
}
type MethodTypes =
  'instance'
  | 'instance accessor'
  | 'instance setter'
  | 'async instance'
  | 'async instance accessor'
  | 'async instance setter'
  | 'static'
  | 'static accessor'
  | 'static setter'
  | 'async static'
  | 'async static accessor'
  | 'async static setter'
interface ClassMethod {
  name: string
  description: ReactNode
  type: MethodTypes
  params?: [string, string][]
  returns: string
  button?: ReactNode
  scope?: 'protected' | 'private'
}
interface ClassProperty {
  name: string
  description: ReactNode
  type: 'instance' | 'static'
  returns: string
  button?: ReactNode
  scope?: 'protected' | 'private'
}
export interface ClassDocProps extends CodeDocProps {
  constructorInfo: ClassConstructor
  extendedName?: string
  methods?: ClassMethod[]
  properties?: ClassProperty[]
  children?: ReactNode
}


const ClassDoc = ({ constructorInfo, methods, properties, children, ...codeDocProps }: ClassDocProps) => {
  let constructorParams = constructorInfo?.params || {}
  let name = codeDocProps.name, strippedName = stripTypeAnnotation(name)
  const constructorExample = () => `const ${camelCase(strippedName)} = new ${name}(${Object.keys(constructorParams).map(param => 'my' + upperFirst(param)).join(', ')})`
  return (
    <CodeDoc {...codeDocProps} >
      {children}
      <Segment className="constructor-doc">
        <H4 italic>Constructor Method</H4>
        <span className="name">
          constructor
          <span className='params'>({Object.entries(constructorParams).map(([param, type], i) => <span key={i}><b>{param}</b>: {type}</span>)})</span>
          <span className='returns'>: {parseTypeAnnotation(codeDocProps.name)}</span>
        </span>
        <div className="description">{constructorInfo.description}</div>
        <Code stringLiteral={constructorExample()} />
      </Segment>
      {methods && methods.length > 0 && (
        <Segment >
          <H4 italic>Class Methods</H4>
          <List divided>
            {methods.map(({ name, description, type, returns, button, scope, params = [] }, i) => (
              <List.Item key={i} className='method-doc'>
                {button}
                <div className='type'>{type} method</div>
                <span className="name">
                  {scope && <span className='opacity-500'>{scope} </span>}
                  {type.includes('async') && <span className='opacity-500'>async </span>}
                  {type.includes('static') && <span className='opacity-500'>static </span>}
                  {type.includes('accessor') && <span className='opacity-500'>get </span>}
                  {type.includes('setter') && <span className='opacity-500'>set </span>}
                  {parseTypeAnnotation(name)}
                  <span className='params'>({params.map(([param, type], i) => <span key={i}><b>{param}</b>: {type}</span>)})</span>
                  <span className='returns'>: {parseTypeAnnotation(returns)}</span>
                </span>
                <div className="description">{description}</div>
              </List.Item>
            ))}
          </List>
        </Segment>
      )}
      {properties && properties.length > 0 && (
        <Segment>
          <H4 italic>Class Properties</H4>
          <List divided>
            {properties.map(({ name, scope, type, description, returns, button }, i) => (
              <List.Item key={i} className='property-doc'>
                <div className='type'>{type} property</div>
                <span className="name">
                  {scope && <span className='opacity-500'>{scope} </span>}
                  {type.includes('static') && <span className='opacity-500'>static </span>}
                  {type.includes('accessor') && <span className='opacity-500'>get </span>}
                  {type.includes('setter') && <span className='opacity-500'>set </span>}
                  {name}
                  <span className='returns'>: {parseTypeAnnotation(returns)}</span>
                </span>
                <div className="description">{description}</div>
                {button}
              </List.Item>
            ))}
          </List>
        </Segment>
      )}
    </CodeDoc>
  )
}


export default ClassDoc