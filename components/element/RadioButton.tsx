import React from 'react'

type RadioButtonProps = {
    status:string,
    setStatus:(status:string)=>void,
    value:string,
    title:string,
    children:React.JSX.Element
}

const RadioButton = ({status,setStatus,value,title,children}:RadioButtonProps) => {
  return (
    <div className={value}>
    <label htmlFor={value}>
      {children}
      {title}
    </label>
    <input type="radio" id={value} value={value} checked={status == value} onChange={(e)=>setStatus(e.target.value)} />
  </div>
  )
}

export default RadioButton