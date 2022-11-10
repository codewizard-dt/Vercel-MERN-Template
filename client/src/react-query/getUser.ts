import { User } from "../components/users/User";
import ApiService from "../util/ApiService";

export const getUser = async (userId: string) => {
  return ApiService.get<{ user: User }>(`/users/${userId}`)
}
