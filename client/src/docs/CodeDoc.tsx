import { PropsWithChildren } from 'react';
import { Button, HeaderSubheader, Label, Segment } from 'semantic-ui-react';
import { H4 } from '../components/basic-html/Headers';
import Code from '../components/helpers/code/Code';
import { getFullName } from './util/Parse';

export interface CodeDocProps extends PropsWithChildren {
  name: string
  extendedName?: string
  params?: [string, string][]
  returns?: string
  filePath: string
  stringLiteral?: string
  labels?: string[]
  type: 'Method' | 'Middleware' | 'Class' | 'Component' | 'Hook'
  className?: string
}

const CodeDoc = ({
  name,
  params,
  returns,
  extendedName,
  type,
  filePath,
  stringLiteral,
  labels,
  className,
  children
}: CodeDocProps) => {
  let fullName = getFullName({ name, params, extendedName, returns })
  return (
    <Segment className={className}>
      <H4>
        <Code name={fullName} filePath={filePath} modalTrigger={<Button floated='right' color="blue" size="mini" icon="code" content={`View ${type}`} />} language="typescript" stringLiteral={stringLiteral} />
        {fullName}
        <HeaderSubheader className='file-path'>{filePath}</HeaderSubheader>
      </H4>
      {children}
      {labels?.length && <Label.Group>{labels.map((label, i) => {
        let [text, detail] = label.split(':')
        return <Label key={i} color="pink" content={text} detail={detail} />
      })}</Label.Group>}
    </Segment>
  )
}

export default CodeDoc