import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const HomePage = () => {
    const router = useRouter()
    const {status} = useSession()
    const [todos, setTodos] = useState([])
    const fetchTodos = async ()=>{
      const res  = await fetch('/api/todos');
      const data = await res.json()
      if(data.status == 'success') setTodos(data.data.todos)
    }

    useEffect(()=>{
     
      fetchTodos()
    },[])

    useEffect(()=>{
      console.log(status)
      status !== 'authenticated' && router.replace('/signin')
    },[status])
  return (
    <div className='home-page'>
      <div  className='home-page--todo'>
        <p>Todo</p>
      </div>
      <div  className='home-page--inProgress'>
        <p>In Progress</p>
      </div>
      <div  className='home-page--review'>
        <p>Review</p>
      </div>
      <div  className='home-page--done'>
        <p>Done</p>
      </div>
    </div>
  )
}

export default HomePage