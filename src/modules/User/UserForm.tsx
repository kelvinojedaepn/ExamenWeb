import React, {ChangeEvent, useEffect, useRef, useState} from "react"
import Style from "./UserFormStyle.module.css"
import {Input} from "../../components/Input"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import {
  createUserAction,
  resetCreateListStatus,
  updateUserAction,
} from "./UserSlice"
import {ApiStatus, IUpdateUserActionProps, IUserForm} from "./User.type"
import {RootState} from "../../app/store"
import {useParams} from "react-router-dom"
import {toastError} from "../../components/ToastifyConfig"

interface IProps {
  isEditForm?: boolean
}

export const UserForm = (props: IProps) => {
  const {isEditForm = false} = props
  const [name, setName] = useState("")
  const [year, setYear] = useState<number>(0)
  const [isMaritate, setIsMaritate] = useState<boolean>(false)

  const params = useParams()
  const userIdToEdit = useRef(parseInt(params.id || ""))

  const {list} = useAppSelector((state: RootState) => state.user)

  useEffect(() => {
    if (isEditForm && userIdToEdit.current) {
      const userData = list.filter(x => x.id === userIdToEdit.current)
      if (userData.length) {
        setName(userData[0].name)
        setYear(userData[0].year)
        setIsMaritate(userData[0].isMaritate)
      }
    }
  }, [isEditForm])

  const {createUserFormStatus, updateUserFormStatus} = useAppSelector(
    (state: RootState) => state.user
  )
  const dispatch = useAppDispatch()

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    const data: IUserForm = {name, year, isMaritate}
    if (name && year && isMaritate) {
      if (isEditForm) {
        const dirtyData: IUpdateUserActionProps = {
          id: userIdToEdit.current,
          data,
        }

        dispatch(updateUserAction(dirtyData))
      } else {
        dispatch(createUserAction(data))
      }
    } else {
      toastError("Please fill the form")
    }
  }

  useEffect(() => {
    if (createUserFormStatus === ApiStatus.success) {
      setName("")
      setYear(0)
      setIsMaritate(false)
      dispatch(resetCreateListStatus())
    }
  }, [createUserFormStatus])

  return (
    <>
      <div className={Style.container}>
        <form className={Style.form} onSubmit={onSubmitForm}>
          <div>
            <Input
              label="Name"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value)
              }}
            />
            <Input
              label="Year"
              value={year}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setYear(+e.target.value)
              }}
            />
            <div>
              <label>Is Maritate?</label>
              <div>
                <label>
                  <input
                    type="radio"
                    value="yes"
                    checked={isMaritate === true}
                    onChange={() => setIsMaritate(true)}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    value="no"
                    checked={isMaritate === false}
                    onChange={() => setIsMaritate(false)}
                  />
                  No
                </label>
              </div>
            </div>
            <div className={Style["btn-wrapper"]}>
              <input
                type="submit"
                value={isEditForm ? "Update" : "Create"}
                disabled={
                  createUserFormStatus === ApiStatus.loading ||
                  updateUserFormStatus === ApiStatus.success
                }
              />
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
