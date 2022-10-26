import React, { PropsWithChildren } from 'react'

export interface NotFoundProps extends PropsWithChildren {

}

const NotFound = ({ children }: NotFoundProps) => {
  return (
    <div>404 Not Found</div>
  )
}

NotFound.defaultProps = {
}

export default NotFound