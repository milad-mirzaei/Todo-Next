import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const SignUpPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const router = useRouter()

    const {status} = useSession()

    useEffect(()=>{
      status == 'authenticated' && router.replace('/')
    },[status])


    const signUpHandler = async()=>{
        const res  = await fetch('/api/auth/signUp',{
            method:'POST',
            body:JSON.stringify({email,password}),
            headers:{'Content-Type':'application/json'}
        })
        const data = await res.json();
        console.log(data)
        if(data.status == 'success') router.push('/signin')
    }


  return (
   <div className='signin-form'>
    <h3>Registration Form</h3>
    <input type="text" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
    <input type="password" placeholder='Password'  value={password} onChange={(e)=>setPassword(e.target.value)} />
    <button onClick={signUpHandler}>Register</button>
    <div>
        <p>Have an account?</p>
        <Link href='/signin'>Sign In</Link>
    </div>
   </div>
  )
}

export default SignUpPage