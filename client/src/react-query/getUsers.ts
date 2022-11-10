import { User } from "../components/users/User";
import ApiService from "../util/ApiService";

export const getUsers = () => {
  return ApiService.get<{ users: User[] }>('/users')
}