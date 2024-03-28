import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import ProfileForm from "../module/ProfileForm";
import ProfileData from "../module/ProfileData";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
const ProfilePage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const { status: sessionStatus } = useSession();
  const [data, setData] = useState(null);
  console.log(data);
  const fetchProfile = async () => {
    const res = await fetch("/api/profile");
    const data = await res.json();
    console.log(data);
    if (data.status == "success" && data.data.name && data.data.lastName) {
      console.log(data.data);
      setData(data.data);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    console.log(sessionStatus);
    sessionStatus !== "authenticated" && router.replace("/signin");
  }, [sessionStatus]);

  const submitHandler = async () => {
    const res = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify({ name, lastName, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if(data.status == 'success'){
         fetchProfile()
    }
  };

  return (
    <div className="profile-form">
      <h2>
        <CgProfile />
        Profile
      </h2>
      {data ? (
        <ProfileData data={data} />
      ) : (
        <ProfileForm
          name={name}
          lastName={lastName}
          password={password}
          setName={setName}
          setLastName={setLastName}
          setPassword={setPassword}
          submitHandler={submitHandler}
        />
      )}
    </div>
  );
};

export default ProfilePage;
