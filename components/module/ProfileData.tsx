import React from 'react'

type ProfileDataProps = {
    data:{ name: string, lastName: string, email: string }
}

const ProfileData = ({data}:ProfileDataProps) => {
  return (
    <div className='profile-data'>
        <div>
            <span>Name :</span>
            <p>{data.name}</p>
        </div>
        <div>
            <span>LastName :</span>
            <p>{data.lastName}</p>
        </div>
        <div>
            <span>Email :</span>
            <p>{data.email}</p>
        </div>
    </div>
  )
}

export default ProfileData