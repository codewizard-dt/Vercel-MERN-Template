import { PropsWithChildren } from 'react'
import { List as ListUI, ListProps } from 'semantic-ui-react'

export interface AppListProps extends ListProps {
  items: any
  renderItem: (item: any, i: number) => React.Component
}

const List = ({ items, renderItem, ...listProps }: AppListProps) => {
  return (
    <ListUI>
      {items.map(renderItem)}
    </ListUI>
  )
}

List.defaultProps = {
}

export default List