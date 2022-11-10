import { Container, Segment } from "semantic-ui-react"
import { H1, H2 } from "../components/basic-html/Headers"
import ApiHandler from "../docs/ApiHandler"
import Authentication from "../docs/Authentication"
import Database from "../docs/Database"
import Forms from "../docs/Forms"
import Messages from "../docs/Messages"
import Tables from "../docs/Tables"
import "../docs/Documentation.sass"
import JsonWebToken from "../docs/JsonWebToken"
import Themes from "../docs/Themes"

const Documentation = () => {
  return (
    <Container textAlign="left">
      <H1>Documentation</H1>
      <H2 italic>Methods, Components, and more</H2>
      <Segment basic>
        <Database />
        <JsonWebToken />
        <ApiHandler />
        <Authentication />
        <Forms />
        <Messages />
        <Themes />
        <Tables />

      </Segment>
    </Container>
  )
}



export default Documentation