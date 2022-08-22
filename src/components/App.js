import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTask from "./AddTask";
import TaskList from './TaskList';
import EditTask from "./EditTask";

function App() {

  const url = "http://localhost:9292"
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch(`${url}/users`)
      .then((r) => r.json())
      .then((data) => setUsers([...data]))
  }, []);

  useEffect(() => {
    fetch(`${url}/tasks`)
      .then((r) => r.json())
      .then((data) => setTasks([...data]))
  }, []);


  const handleTaskFilter = (e) => {
    e.preventDefault();
    setUser(e.target.value === "All" ? "" : e.target.value)
  }

  let displayedTasks = user.length
    ? tasks.filter((task) => task.user_id == user)
    : tasks;

  function handleAddTask(newTask) {
    setTasks([...tasks, newTask]);
  }

  function handleEditTask(editedTask) {
    const newTasks = tasks.map((task) => {
      if (task.id === editedTask.id) {
        return editedTask
      } else {
        return task
      }
    });
    setTasks(newTasks);
  }

  function handleDeleteTask(id) {
    const newTasks = tasks.filter((task) => task.id != id)
    setTasks(newTasks);
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<TaskList tasks={displayedTasks} users={users} url={url} handleEditTask={handleEditTask} handleFilter={handleTaskFilter} />} />
          <Route exact path="/tasks/add" element={<AddTask users={users} url={url} handleAddTask={handleAddTask} />} />
          <Route path="/tasks/:id/edit" element={<EditTask tasks={tasks} users={users} url={url} handleEditTask={handleEditTask} handleDeleteTask={handleDeleteTask} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App