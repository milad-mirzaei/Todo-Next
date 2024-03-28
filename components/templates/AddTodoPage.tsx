import React, { useEffect, useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import RadioButton from "../element/RadioButton";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const AddTodoPage = () => {
  const router = useRouter()
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const {status:sessionStatus} = useSession()
  console.log(title, status);

  const addHandler = async () => {
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title, status }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(res);
    const data = await res.json();

    if (data.status == "success") {
      setTitle("");
      setStatus("todo");
      toast.success("Todo added!ssssssssss" , {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        transition: Bounce,
      });
    }
  };
  useEffect(() => {
    console.log(sessionStatus);
    sessionStatus !== "authenticated" && router.replace("/signin");
  }, [sessionStatus]);

  return (
    <div className="add-form">
      <h2>
        <GrAddCircle />
        Add New Todo
      </h2>
      <div className="add-form__input">
        <div className="add-form__input--first">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="add-form__input--second">
          <RadioButton
            value="todo"
            setStatus={setStatus}
            status={status}
            title="todo"
          >
            <BsAlignStart />
          </RadioButton>
          <RadioButton
            value="inProgress"
            setStatus={setStatus}
            status={status}
            title="inProgress"
          >
            <FiSettings />
          </RadioButton>
          <RadioButton
            value="review"
            setStatus={setStatus}
            status={status}
            title="review"
          >
            <AiOutlineFileSearch />
          </RadioButton>
          <RadioButton
            value="done"
            setStatus={setStatus}
            status={status}
            title="done"
          >
            <MdDoneAll />
          </RadioButton>
          <button onClick={addHandler}>Add</button>
          <ToastContainer
          theme="colored"
          />
          {/* <ToastContainer /> */}
        </div>
      </div>
    </div>
  );
};

export default AddTodoPage;
