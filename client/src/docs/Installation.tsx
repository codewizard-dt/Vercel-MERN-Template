import { Segment } from "semantic-ui-react"
import { H2, H3 } from "../components/basic-html/Headers"
import Code from "../components/helpers/code/Code"
import C from "../components/helpers/code/InlineCode"
import ExternalLink from "../components/helpers/ExternalLink"

const Installation = () => {
  return (
    <Segment>
      <H2>Installation</H2>
      <H3 italic>Fork the Repository</H3>
      <p>Go to the <ExternalLink to="https://github.com/codewizard-dt/Vercel-MERN-Template">repo on GitHub</ExternalLink> and create a fork by clicking on "Fork" button in the top right. Make sure your forked clone is published to your GitHub account.</p>
      <H3 italic>Install Dependencies</H3>
      <p>Go to the directory where you cloned the repo and run <C>npm install</C></p>
      <p>Major dependencies: <ExternalLink to="https://www.typescriptlang.org/">TypeScript</ExternalLink>, <ExternalLink to="https://expressjs.com/">Express</ExternalLink>, <ExternalLink to="https://reactjs.org/">React</ExternalLink>, <ExternalLink to="https://react.semantic-ui.com/">Semantic UI React</ExternalLink>, <ExternalLink to="https://www.axios.com/">Axios</ExternalLink>, <ExternalLink to="https://sass-lang.com/">Sass</ExternalLink></p>
      <H3 italic>Add to Vercel</H3>
      <p>Log in to <ExternalLink to="https://vercel.com/">Vercel</ExternalLink> and create a new project. When prompted, choose to import your forked repository.</p>
      <H3>Repo Structure</H3>
      <p>This structure is specifically designed to deploy to Vercel and differs from file system structures for typical Express apps in several important ways.
      </p>
      <Code language="bash" stringLiteral={
        `Basic File Structure # does not include all files

root/
  vercel.json       # config file for Vercel deployment
  api/              # any .js or .ts files in this folder will be turned into serverless functions by Vercel
    index.ts        # entry point to Express server, equivalent to server.ts or server/index.ts
    .env            # not in repo, but put your .env file here
  server/           # custom express server
    db/             # MongoDB helper functions and Types
    middleware/     # Auth, Session, and DB middlewares
    models/         # User model (mongoose)
    routes/         # API routes
    util/           # Helper functions
  client/           # built from create-react-app
    public/         # static files and assets
    src/            
      pages/        # for components with routes
      components/   # for components 
      react-query/  # for queries and mutations
      theme/        # for sass/css theme files
      util/         # ContextProviders, Helper Services
      config/       # a place for configuration constants
      docs/         # template documentation components`
      } />
    </Segment>
  )
}

export default Installation