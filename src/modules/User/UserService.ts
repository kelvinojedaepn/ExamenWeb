import httpService from "../../service/HttpService"
import ApiConfig from "../../service/APiConfig"
import {IUser, IUserForm} from "./User.type"

export const getUserListApi = async () => {
  return await httpService.get<IUser[]>(ApiConfig.user)
}

export const createUserApi = async (data: IUserForm) => {
  return await httpService.post<IUser>(ApiConfig.user, data)
}
