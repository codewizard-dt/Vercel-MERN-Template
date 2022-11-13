import { Segment } from "semantic-ui-react"
import { H2, H3 } from "../components/basic-html/Headers"
import ExternalLink from "../components/helpers/ExternalLink"
import ClassDoc from "./ClassDoc"
import FunctionDoc from "./FunctionDoc"

const ApiHandler = () => {
  return (
    <Segment>
      <H2>API Service</H2>
      <H3 italic>Helper Class</H3>
      <ClassDoc name="AxiosApi" type='Class' labels={['frontend', 'api']} filePath="import { AxiosApi } from '@codewizard-dt/axios-api-handler'" constructorInfo={{ description: 'Creates an Axios instance with built-in request and response handlers', params: { config: 'AxiosRequestConfig' } }} stringLiteral={literals.axiosApi}
        methods={[
          { name: 'post<T>', params: [['...args', 'Paramters<AxiosPost>']], type: 'async instance', description: 'Use it like a regular Axios post request but enjoy typed responses', returns: 'Promise<T | ApiResponseError>' },
          { name: 'get<T>', params: [['...args', 'Paramters<AxiosGet>']], type: 'async instance', description: 'Use it like a regular Axios get request but enjoy typed responses', returns: 'Promise<T | ApiResponseError>' },
          { name: 'delete<T>', params: [['...args', 'Paramters<AxiosDelete>']], type: 'async instance', description: 'Use it like a regular Axios delete request but enjoy typed responses', returns: 'Promise<T | ApiResponseError>' },
          { name: 'patch<T>', params: [['...args', 'Paramters<AxiosPatch>']], type: 'async instance', description: 'Use it like a regular Axios patch request but enjoy typed responses', returns: 'Promise<T | ApiResponseError>' },
          {
            name: 'interceptors', type: 'instance accessor', description: <span>Exposes the Axios interceptors method to add custom request or response handling. For more details, see the <ExternalLink to="https://axios-http.com/docs/interceptors">Axios docs</ExternalLink></span>, returns: 'Axios.prototype.interceptors'
          }
        ]}
        properties={[
          { name: 'axios', scope: 'private', description: 'Creates and uses a regular Axios instance behind the hood. Inaccessible except when using the above methods', type: 'instance', returns: 'Axios' }
        ]}>
        <div className="description">This class provides all the nessecary methods to make seamless requests between client and server</div>
      </ClassDoc>
      <H3 italic>Helper Methods</H3>
      <FunctionDoc name="jsonRequest"
        params={[['data', 'any'], ['headers', 'AxiosHeaders']]}
        returns="string"
        filePath="import { jsonRequest } from '@codewizard-dt/axios-api-handler'"
        type="Method"
        stringLiteral={literals.jsonRequest}>
        <div className="description">Stringifies the data and sets a header if data is not a string<div className="detail">Automatically applied to AxiosApi class</div></div>
      </FunctionDoc>
      <FunctionDoc name="jsonResponse"
        params={[['data', 'any'], ['headers', 'AxiosHeaders']]}
        returns="string | object"
        filePath="import { jsonResponse } from '@codewizard-dt/axios-api-handler'"
        type="Method"
        stringLiteral={literals.jsonResponse}>
        <div className="description">Parses JSON data into an object, else returns original data<div className="detail">Automatically applied to AxiosApi class</div></div>
      </FunctionDoc>
      <FunctionDoc name="responseHandler<T>"
        params={[['res', 'AxiosResponse']]}
        returns="T | ApiResponseError"
        filePath="import { responseHandler } from '@codewizard-dt/axios-api-handler'"
        type="Method"
        stringLiteral={literals.responseHandler}>
        <div className="description">Destructures the AxiosResponse and returns the data object.<div className="detail">Automatically applied to AxiosApi class</div></div>
      </FunctionDoc>
    </Segment >
  )
}

const literals = {
  axiosApi: `import { Axios, AxiosRequestConfig } from 'axios';

import { jsonRequest, jsonResponse, responseHandler } from "./HelperMethods";
import type { ApiResponse } from './Types';

export type AxiosPost = typeof Axios.prototype.post
export type AxiosGet = typeof Axios.prototype.get
export type AxiosDelete = typeof Axios.prototype.delete
export type AxiosPatch = typeof Axios.prototype.patch
export type ResponseInterceptor = Parameters<typeof Axios.prototype.interceptors.response.use>
export type RequestInterceptor = Parameters<typeof Axios.prototype.interceptors.request.use>

export class AxiosApi {
  private defaultConfig: AxiosRequestConfig = {
    responseType: 'json',
    transformRequest: jsonRequest,
    transformResponse: jsonResponse,
    validateStatus: (status) => status < 500
  }
  private axios: Axios;
  constructor(config?: AxiosRequestConfig) {
    this.axios = new Axios({ ...this.defaultConfig, ...config })
  }

  async post<T>(...args: Parameters<AxiosPost>) {
    return this.axios.post<ApiResponse<T>>(...args).then(responseHandler<T>)
  }
  async get<T>(...args: Parameters<AxiosGet>) {
    return this.axios.get<ApiResponse<T>>(...args).then(responseHandler<T>)
  }
  async delete<T>(...args: Parameters<AxiosDelete>) {
    return this.axios.post<ApiResponse<T>>(...args).then(responseHandler<T>)
  }
  async patch<T>(...args: Parameters<AxiosPatch>) {
    return this.axios.post<ApiResponse<T>>(...args).then(responseHandler<T>)
  }

  get interceptors() { return this.axios.interceptors }
}`,
  jsonRequest: `import { AxiosRequestTransformer } from "axios"
export const jsonRequest: AxiosRequestTransformer = (data, headers) => {
  if (typeof data !== 'string') {
    data = JSON.stringify(data)
    headers.setContentType('application/json')
  }
  return data
}
`,
  jsonResponse: `import { AxiosResponseTransformer } from "axios"
export const jsonResponse: AxiosResponseTransformer = (data, headers) => {
  try {
    data = JSON.parse(data)
    return data
  } catch (error) {
    return data
  }
}
`,
  responseHandler: `import { ApiResponseError, RawResponse } from "./Types" // ie from "@codewizard-dt/axios-api-handler"
export function responseHandler<T = unknown>({ data }: RawResponse<T>): T & ApiResponseError {
  if (data.error) console.error(data.error)
  if (data.errors) console.error(data.errors)
  return data
}`
}

export default ApiHandler