import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {
  ApiStatus,
  IUserForm,
  IUserState,
  IUpdateUserActionProps,
} from "./User.type"
import {
  createUserApi,
  deleteUserApi,
  getUserListApi,
  updateUserApi,
} from "./UserService"
import {toastSuccess} from "../../components/ToastifyConfig"

const initialState: IUserState = {
  list: [],
  listStatus: ApiStatus.ideal,
  createUserFormStatus: ApiStatus.ideal,
  updateUserFormStatus: ApiStatus.ideal,
}

export const getUserListAction = createAsyncThunk(
  "user/getUserListAction",
  async () => {
    const response = await getUserListApi()
    return response.data
  }
)

export const createUserAction = createAsyncThunk(
  "user/createUserAction",
  async (data: IUserForm) => {
    //create api
    const response = await createUserApi(data)
    // return status
    return response.data
  }
)

export const updateUserAction = createAsyncThunk(
  "user/updateUserAction",
  async (props: IUpdateUserActionProps) => {
    const {id, data} = props
    //create api
    const response = await updateUserApi(id, data)
    // return status
    return response.data
  }
)

export const deleteUserAction = createAsyncThunk(
  "user/deleteUserAction",
  async (id: number) => {
    await deleteUserApi(id)
    return id
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetCreateListStatus: state => {
      state.listStatus = ApiStatus.ideal
    },
  },
  extraReducers: builder => {
    builder.addCase(getUserListAction.pending, state => {
      state.listStatus = ApiStatus.loading
    })
    builder.addCase(getUserListAction.fulfilled, (state, action) => {
      state.listStatus = ApiStatus.ideal
      state.list = action.payload
    })
    builder.addCase(getUserListAction.rejected, state => {
      state.listStatus = ApiStatus.error
    })
    builder.addCase(createUserAction.pending, state => {
      state.createUserFormStatus = ApiStatus.loading
    })
    builder.addCase(createUserAction.fulfilled, state => {
      state.createUserFormStatus = ApiStatus.success
      toastSuccess("User created")
    })
    builder.addCase(createUserAction.rejected, state => {
      state.createUserFormStatus = ApiStatus.error
      toastSuccess("Error white creating user")
    })
    builder.addCase(deleteUserAction.fulfilled, (state, action) => {
      const newList = state.list.filter(x => x.id !== action.payload)
      state.list = newList
    })
    builder.addCase(updateUserAction.pending, state => {
      state.updateUserFormStatus = ApiStatus.loading
    })
    builder.addCase(updateUserAction.fulfilled, state => {
      state.updateUserFormStatus = ApiStatus.ideal
      toastSuccess("User updated")
    })
    builder.addCase(updateUserAction.rejected, state => {
      state.updateUserFormStatus = ApiStatus.error
      toastSuccess("Error white updating user")
    })
  },
})

export default userSlice.reducer
export const {resetCreateListStatus} = userSlice.actions
