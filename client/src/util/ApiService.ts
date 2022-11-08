import { AxiosApi } from "@codewizard-dt/axios-api-handler";

const ApiService = new AxiosApi({
  baseURL: '/api'
})

export default ApiService