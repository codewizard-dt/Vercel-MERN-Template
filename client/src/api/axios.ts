import { Axios as AxiosBase } from "axios";
import { tokenName } from "../config/auth";

const axiosApi = new AxiosBase({
  baseURL: '/api',
  transformRequest: (data, headers) => {
    let token = localStorage.getItem(tokenName)
    if (token) headers.set('Authorization', `Bearer ${token}`)
    if (typeof data !== 'string') {
      headers.set('Content-Type', 'application/json')
      data = JSON.stringify(data)
    }
    return data
  },
  transformResponse: (data, headers) => {
    try {
      return JSON.parse(data)
    } catch (error) {
      return data
    }
  }
})

export default axiosApi