import React, {ChangeEvent} from "react"
import Style from "./InputStyle.module.css"

interface IProps {
  label: string
  value: string | number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
export const Input = (props: IProps) => {
  const {label, value, onChange} = props
  return (
    <div className={Style.container}>
      <label>{label}: </label>
      <div>
        <input
          type="text"
          value={value}
          className={Style.input}
          onChange={onChange}
        />
      </div>
    </div>
  )
}
