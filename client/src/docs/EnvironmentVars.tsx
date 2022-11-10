import { Link } from "react-router-dom";
import { Icon, Label, Message, Segment } from "semantic-ui-react"
import { H1, H3 } from '../components/basic-html/Headers';
import Code from "../components/helpers/code/Code";
import InlineCode from "../components/helpers/code/InlineCode";
import ExternalLink from "../components/helpers/ExternalLink";

const EnvironmentVars = () => {
  return (
    <Segment id="env-vars">
      <H1>Setup Environment Variables</H1>
      <H3 italic>Local Development</H3>
      <p>
        To setup your development environment create a <InlineCode>/api/.env</InlineCode> file and add the variables you see below.
      </p>
      <H3 italic>Vercel Production Deployment</H3>
      <p>
        For production, define these variables using the <ExternalLink to="http://vercel.com">Vercel dashboard</ExternalLink>. This section is accessible by clicking on <InlineCode>Project Name &gt; Settings &gt; Environment Variables</InlineCode>
      </p>
      <Message>
        <Icon size="small" name="exclamation" />
        MongoDB / Vercel <Link to="#integrations">Integration</Link> will automatically set the MONGODB_URI env variable for you.
      </Message>
      <Code stringLiteral={
        `MONGODB_URI="mongodb://localhost:27017"     # your mongo connection string
DB_NAME="vercel-template"                   # your mongo database name
APP_SECRET="development"                    # your secret for session cookies
MAX_TOKEN_AGE="1w"                          # session cookie max age`
      }>
      </Code>
    </Segment>
  )
}

export default EnvironmentVars