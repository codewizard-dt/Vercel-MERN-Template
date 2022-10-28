import { ApiResponse } from "@codewizard-dt/use-form-hook";
import { Axios, AxiosRequestTransformer, AxiosResponseTransformer } from "axios";
import { tokenName } from "../config/auth";
import { addAuthHeader, parseJson, responseHandler } from "./AxiosMethods";

type AxiosPost = typeof Axios.prototype.post

class AxiosApi {
  axios = new Axios({
    baseURL: '/api',
    transformRequest: addAuthHeader,
    transformResponse: parseJson
  })
  async post<T>(...args: Parameters<AxiosPost>) {
    return this.axios.post<ApiResponse<T>>(...args).then(responseHandler<T>)
  }
}

const axiosApi = new AxiosApi()

export default axiosApi