import { Container, Segment } from "semantic-ui-react"
import EnvironmentVars from "../docs/EnvironmentVars"
import Installation from "../docs/Installation"
import { H1, H2 } from "../components/basic-html/Headers"
import Integrations from "../docs/Integrations"

const GetStarted = () => {
  return (
    <Container textAlign="left">
      <H1>Getting Started</H1>
      <H2 italic={true}>Setup and Configuration</H2>
      <Segment basic >
        <Installation />
        <EnvironmentVars />
        <Integrations />


      </Segment>
    </Container>
  )
}

export default GetStarted