import React from 'react'

type ProfileFormProps = {
    name:string,
    lastName:string,
    password:string,
    setName:React.Dispatch<React.SetStateAction<string>>
    setLastName:React.Dispatch<React.SetStateAction<string>>
    setPassword:React.Dispatch<React.SetStateAction<string>>
    submitHandler:() => Promise<void>
}

const ProfileForm = ({name,lastName,password,setName,setLastName,setPassword,submitHandler}:ProfileFormProps) => {
  return (
    <>
    <div className='profile-form__input'>
            <div>
                <label htmlFor='name' >Name:</label>
                <input type="text" id='name' value={name} onChange={(e)=>setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor='lastName' >LastName:</label>
                <input type="text" id='lastName' value={lastName} onChange={(e)=>setLastName(e.target.value)} />
            </div>
            <div>
                <label htmlFor='password' >Password:</label>
                <input type="password" id='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
    </div>

    <button onClick={submitHandler}>Submit</button>
    </>
  )
}

export default ProfileForm