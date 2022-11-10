import React, { PropsWithChildren } from 'react'
import { Container, Divider, Message, Segment } from 'semantic-ui-react'
import BackButton from './buttons/BackButton'

export interface NotFoundProps extends PropsWithChildren {

}

const NotFound = ({ children }: NotFoundProps) => {
  return (
    <Segment basic>
      <Container text>
        <Message className='fit-content' negative icon='exclamation circle' content="Sorry, we can't find that page..." />
      </Container>
      <Divider hidden />
      <BackButton icon="angle left" color='red' />
    </Segment>
  )
}

NotFound.defaultProps = {
}

export default NotFound