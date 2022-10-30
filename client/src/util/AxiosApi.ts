import { AxiosApi } from "@codewizard-dt/use-form-hook";
import { tokenName } from "../config/auth";

const axiosApi = new AxiosApi(tokenName)

export default axiosApi