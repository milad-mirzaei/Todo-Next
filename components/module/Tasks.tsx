import { todo, todoStatus } from "@/types/types";
import React, { useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import {RiMastodonLine} from 'react-icons/ri'

type TasksProps = {
  data:todo[]
  fetchTodos: () => Promise<void>
  next?:todoStatus
  back?:todoStatus
}

const Tasks = ({data,fetchTodos,back,next}:TasksProps) => {
  const [changeStatusIsLaoding, setChangeStatusIsLaoding] = useState(false)
  const [clickedTodoIndex, setClickedTodoIndex] = useState(null)

const changeStatus = async(id:string,status:todoStatus)=>{
  setChangeStatusIsLaoding(true)
    const res = await fetch('/api/todos',{
      method:'PATCH',
      body:JSON.stringify({id,status}),
      headers:{"Content-Type":"application/json"}
    })
    const data = await res.json()
    setChangeStatusIsLaoding(false)
    if(data.status == 'success'){
      console.log('success')
      fetchTodos()
    }
}


  return <div className="tasks">
    {data?.map((todo,todoIndex)=>(
      <div key={todo._id} className="tasks__card">
        <span className={todo.status}></span>
        <RiMastodonLine />
        <h4>{todo.title}</h4>
        <div>
          {back ? <button className="button-back" onClick={()=>{changeStatus(todo._id,back),setClickedTodoIndex(todoIndex)}}>
            <BiLeftArrow/>
            {(changeStatusIsLaoding && clickedTodoIndex == todoIndex) ? 'loading...' : back}
          </button> : <div></div> }
          {next ? <button className="button-next" onClick={()=>{changeStatus(todo._id,next),setClickedTodoIndex(todoIndex)}}>
            {(changeStatusIsLaoding && clickedTodoIndex == todoIndex) ? 'loading...' : next}
            <BiRightArrow/>
          </button> : <div></div> }
        </div>
      </div>
    ))}
  </div>;
};

export default Tasks;
