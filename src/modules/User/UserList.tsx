import React, {useEffect} from "react"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import {RootState} from "../../app/store"
import {ApiStatus, IUser} from "./User.type"
import {getUserListAction} from "./UserSlice"

export const UserList = () => {
  const {list, listStatus} = useAppSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getUserListAction())
  }, [])

  return (
    <>
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Year</th>
          <th>Is Maritate?</th>
          <th>Actions</th>
        </tr>
        {listStatus === ApiStatus.loading && <body> Loading</body>}
        {listStatus === ApiStatus.error && <body> Error</body>}
        {listStatus === ApiStatus.ideal &&
          list.map((user: IUser, index: number) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.year}</td>
                <td>{user.isMaritate ? "Si" : "No"}</td>
                <td>Action</td>
              </tr>
            )
          })}
      </table>
    </>
  )
}
