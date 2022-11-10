import { Container, Label, Segment } from "semantic-ui-react"
import EnvironmentVars from "../docs/EnvironmentVars"
import Installation from "../docs/Installation"
import { H1, H2 } from "../components/basic-html/Headers"
import Integrations from "../docs/Integrations"
import Authentication from "../docs/Authentication"
import ApiHandler from "../docs/ApiHandler"
import Database from "../docs/Database"
import Forms from "../docs/Forms"
import Messages from "../docs/Messages"

const GetStarted = () => {
  return (
    <Container textAlign="left">
      <H1>Getting Started</H1>
      <H2 italic={true}>Setup and Configuration</H2>
      <Segment basic >
        {/* <Label.Group>
          <Label>Installation</Label>
          <Label>Environment Variables</Label>
          <Label>Integrations</Label>
        </Label.Group> */}
        <Installation />
        <EnvironmentVars />
        <Integrations />


      </Segment>
    </Container>
  )
}

export default GetStarted