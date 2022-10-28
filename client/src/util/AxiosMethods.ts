import { AxiosRequestTransformer, AxiosResponse, AxiosResponseTransformer } from "axios"
import { tokenName } from "../config/auth"
import { ApiResponse } from '@codewizard-dt/use-form-hook';

export const addAuthHeader: AxiosRequestTransformer = (data, headers) => {
  let token = localStorage.getItem(tokenName)
  if (token) headers.set('Authorization', token)
  if (typeof data !== 'string') {
    headers.set('Content-Type', 'application/json')
    data = JSON.stringify(data)
  }
  return data
}
export const parseJson: AxiosResponseTransformer = (data, headers) => {
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}
export function responseHandler<T = unknown>({ data: { data, error, errors } }: AxiosResponse<ApiResponse<T>>) {
  return { data, error, errors }
}