import { Header, List, Segment } from "semantic-ui-react"
import { H2, H3 } from "../components/basic-html/Headers"
import C from "../components/helpers/code/InlineCode"
import ExternalLink from "../components/helpers/ExternalLink"
import CodeDoc from "./CodeDoc"


const Database = () => {
  return (
    <Segment id="database">
      <H2>Database Connection</H2>
      {/** METHODS */}
      <H3 italic>Helper Methods</H3>
      <Segment.Group>
        <CodeDoc name="dbConnect"
          type='Method'
          filePath="server/db/dbConnect.ts"
          labels={['backend', 'async']}
          stringLiteral={literals.dbConnect}>
          <div className="description">
            Initializes and returns the globally defined Mongoose database connection
            <div className="detail">Once initialized, any further calls do not create additional database connections</div>
          </div>
        </CodeDoc>
        <CodeDoc type="Method" name="getMongo" filePath="server/db/getMongo.ts" labels={['backend', 'async']} stringLiteral={literals.getMongo} >
          <div className="description">
            Returns the globally defined MongoDB <ExternalLink to="https://mongodb.github.io/node-mongodb-native/4.11/classes/Db.html">Db class</ExternalLink> instance
            <div className="detail">You can use the returned DB class instance for raw MongoDB queries</div>
          </div>
        </CodeDoc>
      </Segment.Group>
      <H3 italic>Middleware</H3>
      <Segment.Group>
        <CodeDoc type="Middleware" name="useDb"
          filePath="server/middleware/useDb.ts"
          labels={['backend', 'middleware']}
          stringLiteral={literals.useDb}>
          <div className="description">
            Initializes a database connection before passing to the next middleware or route.
            <div className="detail">Any Mongoose model operations are <ExternalLink to="https://mongoosejs.com/docs/connections.html#buffering">buffered</ExternalLink>, so you don't need to <C>await</C> the connection promise</div>
          </div>

        </CodeDoc>
      </Segment.Group>
    </Segment>
  )
}

const literals = {
  dbConnect: `import mongoose, { ConnectOptions } from 'mongoose'

async function dbConnect(): Promise<typeof mongoose> {
  if (!global.mongoose) {
    mongoose.connection
      .on('open', () => console.log('Mongoose connected'))
      .on('close', () => console.log('Mongoose closed'))
      .on('error', (error) => console.log(error))

    global.mongoose = mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DB_NAME || 'vercel-template'
      } as ConnectOptions
    )
  }
  return global.mongoose
}

export default dbConnect`,
  getMongo: `import dbConnect from "./dbConnect";
import { Db as MongoDB } from 'mongodb'

export async function getMongo(): Promise<MongoDB> {
  return dbConnect().then(mongoose => mongoose.connection.db)
}`,
  useDb: `import { RequestHandler } from "express"
import dbConnect from "../db/dbConnect"

export const useDb: RequestHandler = (req, res, next) => {
  dbConnect()
  next()
}`
}

export default Database