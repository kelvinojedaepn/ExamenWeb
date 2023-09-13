import React, {ChangeEvent, useEffect, useState} from "react"
import Style from "./UserFormStyle.module.css"
import {Input} from "../../components/Input"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import {createUserAction, resetCreateListStatus} from "./UserSlice"
import {ApiStatus, IUserForm} from "./User.type"
import {RootState} from "../../app/store"

export const UserForm = () => {
  const [name, setName] = useState("")
  const [year, setYear] = useState<number>(0)
  const [isMaritate, setIsMaritate] = useState<boolean>(false)

  const {createUserFormStatus} = useAppSelector(
    (state: RootState) => state.user
  )
  const dispatch = useAppDispatch()

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    const data: IUserForm = {name, year, isMaritate}
    dispatch(createUserAction(data))
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
              <input type="submit" value="Create" />
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
