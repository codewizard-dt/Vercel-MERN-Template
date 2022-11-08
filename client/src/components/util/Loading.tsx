import { PropsWithChildren } from "react"
import { Loader, LoaderProps, Message } from "semantic-ui-react"
import './Loading.sass'

interface LoadingProps extends LoaderProps {
  message?: string
}

const Loading = ({ message = "Loading", children, ...loaderProps }: LoadingProps) => {
  return (
    <Message className="loading">
      <Loader active {...loaderProps}>
        {message}
        {children}
      </Loader>
    </Message>
  )
}

export default Loading