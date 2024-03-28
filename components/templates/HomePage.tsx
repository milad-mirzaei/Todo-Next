import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Tasks from "../module/Tasks";
import { todosType } from "@/types/types";


const HomePage = () => {
  const router = useRouter();
  const { status } = useSession();
  const [todos, setTodos] = useState<todosType>({});
  console.log(todos)
  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    if (data.status == "success") setTodos(data.data.todos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    console.log(status);
    status !== "authenticated" && router.replace("/signin");
  }, [status]);
  return (
    <div className="home-page">
      <div className="home-page--todo">
        <p>Todo</p>
        <Tasks data={todos.todo} fetchTodos={fetchTodos} next="inProgress"  />
      </div>
      <div className="home-page--inProgress">
        <p>In Progress</p>
        <Tasks data={todos.inProgress} fetchTodos={fetchTodos} next="review" back="todo" />
      </div>
      <div className="home-page--review">
        <p>Review</p>
        <Tasks data={todos.review} fetchTodos={fetchTodos} next="done" back="inProgress" />
      </div>
      <div className="home-page--done">
        <p>Done</p>
        <Tasks data={todos.done} fetchTodos={fetchTodos} back="review" />
      </div>
    </div>
  );
};

export default HomePage;
