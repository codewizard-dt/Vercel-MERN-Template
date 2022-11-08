import { User } from "../components/users/User";
import ApiService from "../util/ApiService";
// import axiosApi from "../util/FormHandler";

export const getUser = async (userId: string) => {
  return ApiService.get<{ user: User }>(`/users/${userId}`)
}

// export default getUser