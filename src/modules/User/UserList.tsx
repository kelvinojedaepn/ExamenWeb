import React, {useEffect, useState} from "react"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import {RootState} from "../../app/store"
import {ApiStatus, IUser} from "./User.type"
import {deleteUserAction, getUserListAction} from "./UserSlice"
import {Modal} from "../../components/modal"
import {useNavigate} from "react-router-dom"

export const UserList = () => {
  const [userDataToView, setUserDataToView] = useState<IUser | null>(null)
  const {list, listStatus} = useAppSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()

  const navigator = useNavigate()

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
                <td>
                  <div>
                    <input
                      type="button"
                      value="Edit"
                      onClick={() => {
                        navigator(`/edit/${user.id}`)
                      }}
                    />
                    <input
                      type="button"
                      value="View"
                      onClick={() => setUserDataToView(user)}
                    />
                    <input
                      type="button"
                      value="Delete"
                      onClick={() => {
                        dispatch(deleteUserAction(user.id))
                      }}
                    />
                    <input type="button" value="Add Car" />
                  </div>
                </td>
              </tr>
            )
          })}
      </table>
      {userDataToView && (
        <Modal
          title="User Details"
          onClose={() => {
            setUserDataToView(null)
          }}
        >
          <div>
            <div>
              <label>Name: </label>
              {userDataToView.name}
            </div>
            <div>
              <label>Year: </label>
              {userDataToView.year}
            </div>
            <div>
              <label>isMaritate: </label>
              {userDataToView.isMaritate ? "Si" : "No"}
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
