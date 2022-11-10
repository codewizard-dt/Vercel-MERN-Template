import { Message, Segment } from "semantic-ui-react"
import { H2, H3 } from "../components/basic-html/Headers"
import C from "../components/helpers/code/InlineCode"
import ExternalLink from "../components/helpers/ExternalLink"

const Integrations = () => {
  return (
    <Segment id='integrations'>
      <H2>Vercel Integrations</H2>
      <Message positive>
        After you have this template running locally, there are plenty of Vercel supported integrations. You can see a full list <ExternalLink to="https://vercel.com/integrations">here</ExternalLink>.
      </Message>
      <H3 italic>GitHub Continous Deployment</H3>
      <p>When you create a new project on the Vercel dashboard, connect it to GitHub and select the repository containing this template (or whatever project you created using the template). Whenever you run <C>git push origin main</C>, Vercel will start a new deployment build. If you push to another branch, Vercel will create a "Preview" deployment.
      </p>
      <H3 italic>MongoDB Atlas</H3>
      <p>Follow the directions found <ExternalLink to="https://vercel.com/integrations/mongodbatlas">here</ExternalLink>. You'll need a MongoDB Atlas account to do this. The integration will automatically add your MONGODB_URI environment variable to your Vercel project.</p>
    </Segment>
  )
}

export default Integrations