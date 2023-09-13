export interface IUser {
  id: number
  name: string
  year: number
  isMaritate: boolean
}

export enum ApiStatus {
  "loading",
  "ideal",
  "success",
  "error",
}

export interface IUserState {
  list: IUser[]
  listStatus: ApiStatus
  createUserFormStatus: ApiStatus
}

export interface IUserForm {
  name: string
  year: number
  isMaritate: boolean
}
