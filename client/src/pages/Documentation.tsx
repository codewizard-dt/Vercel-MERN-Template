import { Button, Container, List, Segment } from "semantic-ui-react"
import { H1, H2, H3 } from "../components/basic-html/Headers"
import ApiHandler from "../docs/ApiHandler"
import Authentication from "../docs/Authentication"
import ClassDoc from "../docs/ClassDoc"
import CodeDoc from "../docs/CodeDoc"
import Database from "../docs/Database"
import Forms from "../docs/Forms"
import Messages from "../docs/Messages"
import Tables from "../docs/Tables"
import "../docs/Documentation.sass"
import ExternalLink from "../components/helpers/ExternalLink"
import C from "../components/helpers/code/InlineCode"
import Code from "../components/helpers/code/Code"
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