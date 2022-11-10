import { PropsWithChildren, ReactNode } from 'react'
import { Message, Table as TableUI, TableProps } from 'semantic-ui-react'

export interface AppTableProps extends TableProps, PropsWithChildren {
  data: { [key: string]: ReactNode }[]
}

const Table = ({ data, children }: AppTableProps) => {
  let keys: string[] = data[0] ? Object.keys(data[0]) : []
  if (keys.length === 0) return <Message content="No table data" />
  return (
    <TableUI>
      <TableUI.Header>
        {keys.map((key, i) => <TableUI.HeaderCell key={i} content={key} />)}
      </TableUI.Header>
      {data.map((row, i) => (
        <TableUI.Row>
          {keys.map((key, j) => <TableUI.Cell content={row[key]} />)}
        </TableUI.Row>
      ))}
    </TableUI>
  )
}

Table.defaultProps = {
}

export default Table