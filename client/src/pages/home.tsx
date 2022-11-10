import { Link } from "react-router-dom"
import { useAuth } from "../util/AuthContext"
import LogoutButton from "../components/auth/LogoutButton"
import { Button, Container, Label } from "semantic-ui-react"
import { H1, H2 } from "../components/basic-html/Headers"
import ExternalLink from "../components/helpers/ExternalLink"

const Home = () => {
  const authToken = useAuth()
  return (
    <Container>
      <H1>Vercel MERN Stack</H1>
      <H2>MongoDB, Express, React, NodeJs</H2>
      <p>This is a template repo pre-configured to deploy on <ExternalLink to="https://vercel.com">Vercel</ExternalLink></p>
      <Label.Group>
        <Label>JSON Web Token</Label>
        <Label>Authentication</Label>
        <Label>MongoDB Integration</Label>
      </Label.Group>
      {authToken ? <>
        <Link to="/dashboard">
          <Button>Dashboard</Button>
        </Link>
        <LogoutButton />
      </> : <>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </>}

    </Container>
  )
}

export default Home