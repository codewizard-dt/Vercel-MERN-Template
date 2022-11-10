import { Button, Segment } from "semantic-ui-react"
import { H2, H3 } from "../components/basic-html/Headers"
import Code from "../components/helpers/code/Code"
import ExternalLink from "../components/helpers/ExternalLink"
import ClassDoc from "./ClassDoc"

const JsonWebToken = () => {
  return (
    <Segment>
      <H2>Json Web Token</H2>
      <H3 italic>Helper Class</H3>
      <ClassDoc type="Class" name="TokenService<T>"
        filePath="client/src/util/TokenService.ts"
        stringLiteral={literals.tokenService}
        labels={['front end']}
        constructorInfo={{ params: { tokenName: 'string' }, description: 'Defines the token name and type' }}
        methods={[
          {
            name: 'getToken', description: 'Retrieves the token from localStorage', type: 'instance', returns: 'string'
          },
          {
            scope: 'protected', name: 'setToken', params: [['value', 'string | null']], description: 'Sets the token value in localStorage, or removes if value is null', type: 'instance', returns: 'string'
          },
          {
            name: 'getPayload', description: 'Decodes the token and gives the payload', type: 'instance', returns: 'T | null'
          },
          {
            name: 'isValid', description: 'Returns true if the token is valid', type: 'instance accessor', returns: 'boolean'
          },
        ]}
        properties={[
          {
            name: 'token', type: 'instance', description: <span>Emits events when the value changes. See <ExternalLink to="https://rxjs.dev/api/index/class/BehaviorSubject">RxJS docs</ExternalLink> for more info.</span>, returns: 'BehaviorSubject<string | null>', button: <Code name={'Example Token Subscription'} modalTrigger={<Button color="blue" size="tiny" icon="code" compact floated="right" />} language="javascript" stringLiteral={`let service = new TokenService('token-name')
service.token.subscribe((value: string | null) => yourFunction(value))`}></Code>
          },
          {
            name: 'payload', type: 'instance', description: <span>Emits events when the value changes. See <ExternalLink to="https://rxjs.dev/api/index/class/BehaviorSubject">RxJS docs</ExternalLink> for more info</span>, returns: 'BehaviorSubject<T | null>', button: <Code name={'Example Payload Subscription'} modalTrigger={<Button color="blue" size="tiny" icon="code" compact floated="right" />} language="javascript" stringLiteral={`let service = new TokenService('token-name')
service.payload.subscribe((value: T | null) => yourFunction(value))`}></Code>
          }
        ]}>
        <div className="description">
          This class uses Local Storage to retrieve and store tokens. It can validate and decode tokens, but does not encode them.
        </div>
      </ClassDoc>
    </Segment>
  )
}

const literals = {
  tokenService: `import jwtDecode from "jwt-decode";
import { BehaviorSubject } from "rxjs";
import { tokenName } from '../config/auth';

export class TokenService<T> {
  constructor(public tokenName: string) { }
  token = new BehaviorSubject<string | null>(this.getToken())
  payload = new BehaviorSubject<T | null>(this.getPayload())

  get isValid(): boolean {
    let token = this.getToken()
    if (!token) return false
    else {
      const { exp = 0 } = jwtDecode<{ exp?: Number }>(token);
      return exp < Date.now() / 1000
    }
  }
  getToken() {
    return localStorage.getItem(this.tokenName)
  }
  setToken(token: string | null) {
    if (token) {
      localStorage.setItem(this.tokenName, token)
    } else {
      localStorage.removeItem(this.tokenName)
    }
    this.token.next(token)
    this.payload.next(this.getPayload())
    return token
  }
  getPayload(): T | null {
    try {
      let token = this.getToken()
      if (!token) return null
      const { data } = jwtDecode<{ data: T }>(token)
      return data
    } catch (error) {
      console.log(error)
      this.setToken(null)
      return null
    }
  }
}
`
}

export default JsonWebToken